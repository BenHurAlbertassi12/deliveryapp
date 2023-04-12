const Sequelize = require('sequelize');
const { Products, SalesProduct } = require('../../database/models');

const findAllProducts = async () => Products.findAll();

const getSaleProducts = async (id) => {
    const data = await Products.findAll({
    attributes: ['id', 'name', 'price', 'url_image',
    [Sequelize.literal('sales_products.quantity'), 'quantity']],
    include: [{
      model: SalesProduct,
      as: 'sales_products',
      where: { saleId: id },
      attributes: [],
    }],
  });
  return data;
};

module.exports = {
    findAllProducts,
    getSaleProducts,
};