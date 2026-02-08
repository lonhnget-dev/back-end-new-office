'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factory extends Model {
   static associate(models) {
      // One Factory has many Inspections
      Factory.hasMany(models.Inspection, { foreignKey: 'factory_id' });

      // Location Associations
      if (models.Province) {
        Factory.belongsTo(models.Province, { foreignKey: 'province_code', targetKey: 'province_code' });
      }
      if (models.District) {
        Factory.belongsTo(models.District, { foreignKey: 'district_code', targetKey: 'district_code' });
      }
      if (models.Commune) {
        Factory.belongsTo(models.Commune, { foreignKey: 'commune_code', targetKey: 'commune_code' });
      }
      if (models.Village) {
        Factory.belongsTo(models.Village, { foreignKey: 'village_code', targetKey: 'village_code' });
      }
    }
  }
  
Factory.init({
    factoryKh: DataTypes.STRING,
    factoryEn: DataTypes.STRING,
    status: DataTypes.STRING,
    sector: DataTypes.STRING,
    businessActivity: DataTypes.STRING,
    
    // --- UPDATE THESE FOUR FIELDS ---
    province_code: {
      type: DataTypes.INTEGER,
      allowNull: true  // Allows blank
    },
    district_code: {
      type: DataTypes.INTEGER,
      allowNull: true  // Allows blank
    },
    commune_code: {
      type: DataTypes.INTEGER,
      allowNull: true  // Allows blank
    },
    village_code: {
      type: DataTypes.INTEGER,
      allowNull: true  // Allows blank
    },
    // --------------------------------
    
    locationDetail: DataTypes.TEXT,
    mapLink: DataTypes.STRING,
    totalWorkers: DataTypes.INTEGER,
    femaleWorkers: DataTypes.INTEGER,
    foreignWorkers: DataTypes.INTEGER,
    foreignFemaleWorkers: DataTypes.INTEGER,
    adminWorkers: DataTypes.INTEGER,
    adminPhone: DataTypes.STRING,
    assistantPhone: DataTypes.STRING,
    ownerPhone: DataTypes.STRING,
    directorNationality: DataTypes.STRING,
    directorPhone: DataTypes.STRING,
    remark: DataTypes.TEXT,
    docLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Factory',
    tableName: 'Factories',
  });

  return Factory;
};