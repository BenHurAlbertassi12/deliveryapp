const { SalesProduct } = require('../../database/models/index');

const addSalesAndProducts = async (salesId, products) => {
    const arrayProducts = products;

    const results = await arrayProducts.map(async (product) => {
        const { productsId, quantity } = product;
        const result = await SalesProduct.create({ salesId, productsId, quantity });
        return (result.dataValues);
    });
    const data = await Promise.all(results);
    return data;
};

module.exports = addSalesAndProducts;