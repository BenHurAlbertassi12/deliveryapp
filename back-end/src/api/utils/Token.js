const JWT = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');

const createToken = (payload) => {
  const { id, role, name, email } = payload;
  const token = JWT.sign({ id, role, name, email }, secret);
  return token;
};

const decodeToken = (token) => {
    const data = JWT.verify(token, secret);
    return data;
};

module.exports = {
    createToken,
    decodeToken,
};