'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
    {
      sales_id: 1,
<<<<<<< HEAD:back-end/src/database/seeders/20230329195410-salesProducts.js
      products_id: 1, // Skol lata 250ml
=======
      products_id: 1,
>>>>>>> main-group-9:back-end/src/database/seeders/20230329195414-salesProducts.js
      quantity: 1,
    },
    {
      sales_id: 1,
<<<<<<< HEAD:back-end/src/database/seeders/20230329195410-salesProducts.js
      products_id: 2,  // heineken 600ml
=======
      products_id: 2,
>>>>>>> main-group-9:back-end/src/database/seeders/20230329195414-salesProducts.js
      quantity: 1,
    },
    {
      sales_id: 2,
<<<<<<< HEAD:back-end/src/database/seeders/20230329195410-salesProducts.js
      products_id: 4, // Brahma 600ml
=======
      products_id: 4,
>>>>>>> main-group-9:back-end/src/database/seeders/20230329195414-salesProducts.js
      quantity: 1,
    },
    {
      sales_id: 2,
<<<<<<< HEAD:back-end/src/database/seeders/20230329195410-salesProducts.js
      products_id: 5, // Skol 269ml
=======
      products_id: 5,
>>>>>>> main-group-9:back-end/src/database/seeders/20230329195414-salesProducts.js
      quantity: 1,
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {}); 
  }
};