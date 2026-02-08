'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      if (models.District) {
        this.hasMany(models.District, { foreignKey: 'province_code', sourceKey: 'province_code' });
      }
    }
  }
  Province.init({
    province_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    province_kh: DataTypes.STRING,
    province_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Province',
    tableName: 'Provinces',
  });
  return Province;
};