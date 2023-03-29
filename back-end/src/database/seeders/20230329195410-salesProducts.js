'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
    {
      saleId: 1,
      productId: 1, // Skol lata 250ml
      quantity: 1,
    },
    {
      saleId: 1,
      productId: 2, // heineken 600ml
      quantity: 1,
    },
    {
      saleId: 2,
      productId: 4, // Brahma 600ml
      quantity: 1,
    },
    {
      saleId: 2,
      productId: 5, // Skol 269ml
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {}); 
  }
};
