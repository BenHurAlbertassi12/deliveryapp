const express = require('express');
const newSaleAndProducts = require('../Controllers/SaleProductsController');

const SalesProductsRoutes = express.Router();

SalesProductsRoutes.post('/checkout', (req, res) => newSaleAndProducts(req, res));

module.exports = SalesProductsRoutes;