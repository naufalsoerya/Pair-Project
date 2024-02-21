'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/comment.json', 'utf-8'));

    data.forEach(item => {
      delete item.id 
      item.updatedAt = new Date();
      item.createdAt = new Date();
    });
    await queryInterface.bulkInsert('Comments', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
