const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { type, message } = await authService.login(email, password);

  if (type) return res.status(400).json({ message });

  return res.status(200).json({ token: message });
};

module.exports = {
  login,
};
