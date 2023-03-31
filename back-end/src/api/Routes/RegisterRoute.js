const express = require('express');
const { register } = require('../Controllers/RegisterController');

const registerRoute = express.Router();

registerRoute.post('/register', (req, res) => register(req, res));

module.exports = registerRoute;