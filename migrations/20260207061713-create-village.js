'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Villages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      province_code: {
        type: Sequelize.INTEGER
      },
      district_code: {
        type: Sequelize.INTEGER
      },
      commune_code: {
        type: Sequelize.INTEGER
      },
      village_code: {
        type: Sequelize.INTEGER
      },
      village_kh: {
        type: Sequelize.STRING
      },
      village_en: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Villages');
  }
};