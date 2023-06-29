const { User } = require('../../models');

const requiredFieldsValidation = (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    return { statusCode: 400, message: 'Some required fields are missing' };
  }

  return { statusCode: null, message: '' };
};

const existingUserValidation = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { statusCode: 400, message: 'Invalid fields' };
  }

  return { statusCode: null, message: '' };
};

module.exports = {
  requiredFieldsValidation,
  existingUserValidation,
};
