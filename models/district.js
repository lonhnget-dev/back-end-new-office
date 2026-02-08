'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      if (models.Province) {
        this.belongsTo(models.Province, { foreignKey: 'province_code', targetKey: 'province_code' });
      }
      if (models.Commune) {
        this.hasMany(models.Commune, { foreignKey: 'district_code', sourceKey: 'district_code' });
      }
    }
  }
  District.init({
    province_code: DataTypes.INTEGER,
    district_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    district_kh: DataTypes.STRING,
    district_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'District', // <--- Make sure this is exactly 'District'
    tableName: 'Districts',
  });
  return District; // <--- This MUST be here
};