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
      factoryKh: { type: Sequelize.STRING },
      factoryEn: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING },
      sector: { type: Sequelize.STRING },
      businessActivity: { type: Sequelize.STRING },
      
      // We use allowNull: true so it doesn't break if data is missing
      // province_code: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true, 
      //   references: { model: 'Provinces', key: 'province_code' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL' 
      // },
      // district_code: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: { model: 'Districts', key: 'district_code' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL'
      // },
      // commune_code: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: { model: 'Communes', key: 'commune_code' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL'
      // },
      // village_code: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: { model: 'Villages', key: 'village_code' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL'
      // },

      locationDetail: { type: Sequelize.TEXT },
      mapLink: { type: Sequelize.STRING },
      totalWorkers: { type: Sequelize.INTEGER },
      femaleWorkers: { type: Sequelize.INTEGER },
      foreignWorkers: { type: Sequelize.INTEGER },
      foreignFemaleWorkers: { type: Sequelize.INTEGER },
      adminWorkers: { type: Sequelize.INTEGER },
      adminPhone: { type: Sequelize.STRING },
      assistantPhone: { type: Sequelize.STRING },
      ownerPhone: { type: Sequelize.STRING },
      directorNationality: { type: Sequelize.STRING },
      directorPhone: { type: Sequelize.STRING },
      remark: { type: Sequelize.TEXT },
      docLink: { type: Sequelize.STRING },
      
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    // This allows you to undo the migration cleanly
    await queryInterface.dropTable('Factories');
  }
};