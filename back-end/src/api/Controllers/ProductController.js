const productService = require('../Services/ProductService');

const getProducts = async (_req, res) => {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
};

module.exports = {
    getProducts,
};