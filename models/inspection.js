'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    static associate(models) {
      // Link back to Factory
      Inspection.belongsTo(models.Factory, { foreignKey: 'factory_id' });
    }
  }

  Inspection.init({
    inspection_no: DataTypes.STRING,
    factory_id: DataTypes.INTEGER,
    team_group: DataTypes.STRING,
    inspection_type: DataTypes.STRING,
    inspection_date: DataTypes.DATEONLY,
    source: DataTypes.STRING,
    topic: DataTypes.STRING,
    employer_statement: DataTypes.TEXT,
    employee_statement: DataTypes.TEXT,
    result: DataTypes.TEXT,
    restriction_no: DataTypes.STRING,
    restriction_date: DataTypes.DATEONLY,
    fine_amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Inspection',
    tableName: 'Inspections' // Ensuring table name consistency
  });

  return Inspection;
};