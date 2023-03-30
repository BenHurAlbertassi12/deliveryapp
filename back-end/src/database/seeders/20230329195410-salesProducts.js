'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
    {
      sales_id: 1,
      products_id: 1, // Skol lata 250ml
      quantity: 1,
    },
    {
      sales_id: 1,
      products_id: 2,  // heineken 600ml
      quantity: 1,
    },
    {
      sales_id: 2,
      products_id: 4, // Brahma 600ml
      quantity: 1,
    },
    {
      sales_id: 2,
      products_id: 5, // Skol 269ml
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {}); 
  }
};