const express = require('express');
const { register } = require('../Controllers/RegisterController');
const validateAdminJWT = require('../utils/validateAdminJWT');

const adminManageRoute = express.Router();

adminManageRoute.post(
  '/admin/manage',
  validateAdminJWT,
  (req, res) => register(req, res),
);

module.exports = adminManageRoute;