'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        userId: 3,
        selledId: 2,
        totalPrice: 9.70, // Skol lata 250ml + heineken 600ml
        deliveryAddress: 'Rua da bergamota',
        deliveryNumber: '234',
        saleDate: new Date('2011-08-01T19:58:00.000Z'),
        status: 'Entregue',
      },
      {
        id: 1,
        userId: 3,
        selledId: 2,
        totalPrice: 9.69, // Brahma 600ml + Skol 269ml
        deliveryAddress: 'Rua da laranjeira',
        deliveryNumber: '456',
        saleDate: new Date('2011-08-01T19:58:51.000Z'),
        status: 'Entregue',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
