const express = require('express');
const { 
    addSale,
    getIdSale,
    getUserOrders,
    getSellerSales,
    updateOrder } = require('../Controllers/SalesController');

const SalesRoutes = express.Router();

SalesRoutes.get('/customer/orders/:id', (req, res) => {
    getIdSale(req, res);
});

SalesRoutes.post('/user/orders', (req, res) => {
    getUserOrders(req, res);
});

SalesRoutes.get('/seller/orders', (req, res) => {
    getSellerSales(req, res);
});

SalesRoutes.post('/customer/orders', (req, res) => {
    addSale(req, res);
});

SalesRoutes.put('/customer/orders/:id', (req, res) => {
    updateOrder(req, res);
});

module.exports = SalesRoutes;