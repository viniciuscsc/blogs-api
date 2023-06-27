const { User } = require('../models');
const { createToken } = require('../utils/JWT');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'INVALID_FIELDS', message: 'Invalid fields' };
  }

  const payload = { id: user.id };

  const token = createToken(payload);

  return { type: null, message: token };
};

module.exports = {
  login,
};
