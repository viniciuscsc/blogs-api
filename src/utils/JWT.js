const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
};

const createToken = (userData) => jwt.sign(userData, JWT_SECRET, jwtConfig);

const decodeToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  decodeToken,
};
