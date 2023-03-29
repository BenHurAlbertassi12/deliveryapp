'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 9.70, // Skol lata 250ml + heineken 600ml
        delivery_address: 'Rua da bergamota',
        delivery_number: '234',
        sale_date: new Date('2011-08-01T19:58:00.000Z'),
        status: 'Entregue',
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 9.69, // Brahma 600ml + Skol 269ml
        delivery_address: 'Rua da laranjeira',
        delivery_number: '456',
        sale_date: new Date('2011-08-01T19:58:51.000Z'),
        status: 'Entregue',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
