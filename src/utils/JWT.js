const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const createToken = (payload) => jwt.sign(payload, TOKEN_SECRET);

const decodeToken = (token) => jwt.verify(token, TOKEN_SECRET);

module.exports = {
  createToken,
  decodeToken,
};
