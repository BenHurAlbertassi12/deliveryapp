'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
    {
      saleId: 1,
      productId: 1,
      quantity: 1,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 1,
    },
    {
      saleId: 2,
      productId: 4,
      quantity: 1,
    },
    {
      saleId: 2,
      productId: 5,
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {}); 
  }
};
