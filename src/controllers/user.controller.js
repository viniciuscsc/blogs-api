const userService = require('../services/user.service');

const login = async (req, res) => {
  const loginData = req.body;

  const { statusCode, message } = await userService.login(loginData);

  if (statusCode) return res.status(statusCode).json({ message });

  return res.status(200).json({ token: message });
};

const createUser = async (req, res) => {
  const userData = req.body;

  const { statusCode, message } = await userService.createUser(userData);

  if (statusCode) return res.status(statusCode).json({ message });

  return res.status(201).json({ token: message });
};

module.exports = {
  login,
  createUser,
};
