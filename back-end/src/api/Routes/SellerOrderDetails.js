const { Router } = require('express');
const SalesController = require('../Controllers/SalesController');

const SellerOrderDetails = Router();

SellerOrderDetails.get('/seller/orders/:id', SalesController.getIdSale);
SellerOrderDetails.patch('/seller/orders/:id', SalesController.updateOrder);

module.exports = SellerOrderDetails;