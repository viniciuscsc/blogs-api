const { User } = require('../../models');

const validateLoginRequiredFields = (email, password) => {
  if (!email || !password) {
    return { statusCode: 400, message: 'Some required fields are missing' };
  }

  return { statusCode: null, message: '' };
};

const validateExistingUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { statusCode: 400, message: 'Invalid fields' };
  }

  return { statusCode: null, message: '' };
};

module.exports = {
  validateLoginRequiredFields,
  validateExistingUser,
};
