const { User } = require('../models');

const {
  requiredFieldsValidation,
  existingUserValidation,
} = require('./validations/loginInputValidation');

const { createToken } = require('../utils/JWT');

const login = async (loginData) => {
  const requiredFieldsError = requiredFieldsValidation(loginData);
  if (requiredFieldsError.statusCode) return requiredFieldsError;

  const existingUserError = await existingUserValidation(loginData);
  if (existingUserError.statusCode) return existingUserError;

  const { email } = loginData;
  const user = await User.findOne({ where: { email } });

  delete user.dataValues.password;

  const token = createToken(user.dataValues);

  return { statusCode: null, message: token };
};

module.exports = {
  login,
};
