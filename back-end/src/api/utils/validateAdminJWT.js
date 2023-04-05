const { decodeToken } = require('./Token');

function validateAdminJWT(req, res, next) {
  const adminToken = req.headers.authorization;

  const decipheredToken = decodeToken(adminToken);
  if (!decipheredToken) res.status(401).json({ message: 'Invalid token' });
  next();
}

module.exports = validateAdminJWT;