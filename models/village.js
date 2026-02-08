'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    static associate(models) {
      if (models.Commune) {
        this.belongsTo(models.Commune, { foreignKey: 'commune_code', targetKey: 'commune_code' });
      }
    }
  }
  Village.init({
    commune_code: DataTypes.INTEGER,
    village_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    village_kh: DataTypes.STRING,
    village_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Village',
    tableName: 'Villages',
  });
  return Village;
};