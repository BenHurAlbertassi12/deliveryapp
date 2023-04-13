const express = require('express');
const { 
    addSale,
    getUserOrders,
    getSellerSales,
    updateOrder } = require('../Controllers/SalesController');

const SalesRoutes = express.Router();

SalesRoutes.post('/user/orders', (req, res) => {
    getUserOrders(req, res);
});

SalesRoutes.post('/seller/orders', (req, res) => {
    getSellerSales(req, res);
});

SalesRoutes.post('/customer/orders', (req, res) => {
    addSale(req, res);
});

SalesRoutes.put('/customer/orders/:id', (req, res) => {
    updateOrder(req, res);
});

module.exports = SalesRoutes;