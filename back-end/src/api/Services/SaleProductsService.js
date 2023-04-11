const { SalesProduct } = require('../../database/models/index');

const addSalesAndProducts = async (saleId, products) => {
    const arrayProducts = products;

    const results = await arrayProducts.map(async (product) => {
        const { id, quantity } = product;
        const result = await SalesProduct.create({ saleId, productId: id, quantity });
        return (result.dataValues);
    });
    const data = await Promise.all(results);
    return data;
};

module.exports = addSalesAndProducts;