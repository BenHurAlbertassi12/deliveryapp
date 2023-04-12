const { Router } = require('express');
const productController = require('../Controllers/ProductController');

const ProductRoutes = Router();

ProductRoutes.get('/products', productController.getProducts);
ProductRoutes.post('/products-sales', productController.getSaleProducts);

module.exports = ProductRoutes;