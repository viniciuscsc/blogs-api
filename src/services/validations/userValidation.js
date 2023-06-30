const { User } = require('../../models');

const validateDisplayName = (displayName) => {
  const minDisplayNameLength = 8;

  if (displayName.length < minDisplayNameLength) {
    return {
      statusCode: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return { statusCode: null, message: '' };
};

const validateEmail = async (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const isEmail = regexEmail.test(email);

  if (!isEmail) {
    return { statusCode: 400, message: '"email" must be a valid email' };
  }

  const user = await User.findOne({ where: { email } });

  if (user) {
    return { statusCode: 409, message: 'User already registered' };
  }

  return { statusCode: null, message: '' };
};

const validatePassword = (password) => {
  const minPasswordLength = 6;

  if (password.length < minPasswordLength) {
    return {
      statusCode: 400,
      message: '"password" length must be at least 6 characters long',
    };
  }

  return { statusCode: null, message: '' };
};

const validateId = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return { statusCode: 404, message: 'User does not exist' };

  return { statusCode: null, message: '' };
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateId,
};
