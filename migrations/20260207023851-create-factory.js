'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Factories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      factoryKh: {
        type: Sequelize.STRING
      },
      factoryEn: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      businessActivity: {
        type: Sequelize.STRING
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
      locationDetail: {
        type: Sequelize.TEXT
      },
      mapLink: {
        type: Sequelize.STRING
      },
      totalWorkers: {
        type: Sequelize.INTEGER
      },
      femaleWorkers: {
        type: Sequelize.INTEGER
      },
      foreignWorkers: {
        type: Sequelize.INTEGER
      },
      foreignFemaleWorkers: {
        type: Sequelize.INTEGER
      },
      adminWorkers: {
        type: Sequelize.INTEGER
      },
      adminPhone: {
        type: Sequelize.STRING
      },
      assistantPhone: {
        type: Sequelize.STRING
      },
      ownerPhone: {
        type: Sequelize.STRING
      },
      directorNationality: {
        type: Sequelize.STRING
      },
      directorPhone: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.TEXT
      },
      docLink: {
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
    await queryInterface.dropTable('Factories');
  }
};