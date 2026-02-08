'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
    static associate(models) {
      if (models.District) {
        this.belongsTo(models.District, { foreignKey: 'district_code', targetKey: 'district_code' });
      }
      if (models.Village) {
        this.hasMany(models.Village, { foreignKey: 'commune_code', sourceKey: 'commune_code' });
      }
    }
  }
  Commune.init({
    district_code: DataTypes.INTEGER,
    commune_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    commune_kh: DataTypes.STRING,
    commune_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commune',
    tableName: 'Communes',
  });
  return Commune;
};