'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
   console.log("Using Environment Variable:", config.use_env_variable);
  console.log("Connection String:", process.env[config.use_env_variable]); // Check if this is the Render URL
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('⚠️ Falling back to Local Config (username/password)');
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 1. Read all files in the models folder
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js' && 
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // 2. Initialize each model
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// 3. Run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 4. THE FIX: Attach the connection instances to the db object
db.sequelize = sequelize; // This is what your main index.js is looking for!
db.Sequelize = Sequelize;

module.exports = db;