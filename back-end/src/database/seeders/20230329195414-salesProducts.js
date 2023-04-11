'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales_products', [
    {
      sale_id: 1,
      product_id: 1, // Skol lata 250ml
      quantity: 1,
    },
    {
      sale_id: 1,
      product_id: 2,  // heineken 600ml
      quantity: 1,
    },
    {
      sale_id: 2,
      product_id: 4, // Brahma 600ml
      quantity: 1,
    },
    {
      sale_id: 2,
      product_id: 5, // Skol 269ml
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {}); 
  }
};