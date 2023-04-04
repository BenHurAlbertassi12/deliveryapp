const { Products } = require('../../database/models');

const findAllProducts = async () => Products.findAll();

module.exports = {
    findAllProducts,
};