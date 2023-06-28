const userService = require('../services/user.service');

const errorMap = {
  INVALID_INPUT: 400,
  INVALID_EMAIL: 409,
};

const createUser = async (req, res) => {
  const userData = req.body;

  const { type, message } = await userService.createUser(userData);

  if (type) return res.status(errorMap[type]).json({ message });

  return res.status(201).json({ token: message });
};
module.exports = {
  createUser,
};
