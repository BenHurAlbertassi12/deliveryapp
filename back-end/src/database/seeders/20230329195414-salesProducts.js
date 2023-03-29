'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
    {
      sales_id: 1,
      products_id: 1,
      quantity: 1,
    },
    {
      sales_id: 1,
      products_id: 2,
      quantity: 1,
    },
    {
      sales_id: 2,
      products_id: 4,
      quantity: 1,
    },
    {
      sales_id: 2,
      products_id: 5,
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {}); 
  }
};
