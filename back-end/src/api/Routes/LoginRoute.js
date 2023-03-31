const express = require('express');
const { login } = require('../Controllers/LoginController');

const loginRoute = express.Router();

loginRoute.post('/login', (req, res) => login(req, res));

module.exports = loginRoute;