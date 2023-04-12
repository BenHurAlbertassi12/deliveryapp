const productService = require('../Services/ProductService');

const getProducts = async (_req, res) => {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
};

const getSaleProducts = async (req, res) => {
    const { id } = req.body;
    const saleProducts = await productService.getSaleProducts(id);
    res.status(200).json(saleProducts);
};

module.exports = {
    getProducts,
    getSaleProducts,
};