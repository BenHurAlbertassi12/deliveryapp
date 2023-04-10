const express = require('express');
const { login, getSellersController } = require('../Controllers/LoginController');

const loginRoute = express.Router();

loginRoute.post('/login', (req, res) => login(req, res));
loginRoute.get('/seller', (req, res) => getSellersController(req, res));

module.exports = loginRoute;