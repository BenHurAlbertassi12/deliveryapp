const { Router } = require('express');
const SalesController = require('../Controllers/SalesController');

const CustomerOrderDetails = Router();

CustomerOrderDetails.get('/customer/orders/:id', SalesController.getIdSale);
CustomerOrderDetails.patch('/customer/orders/:id', SalesController.updateOrder);

module.exports = CustomerOrderDetails;