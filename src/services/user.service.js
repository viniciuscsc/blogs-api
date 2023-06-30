const { User } = require('../models');

const { createToken } = require('../utils/JWT');

const {
  validateRequiredFields,
  validateExistingUser,
} = require('./validations/loginInputValidation');

const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('./validations/createUserInputValidation');

const login = async (loginData) => {
  const { email, password } = loginData;

  const requiredFieldsError = validateRequiredFields(email, password);
  if (requiredFieldsError.statusCode) return requiredFieldsError;

  const existingUserError = await validateExistingUser(email, password);
  if (existingUserError.statusCode) return existingUserError;

  const user = await User.findOne({ where: { email } });

  delete user.dataValues.password;

  const token = createToken(user.dataValues);

  return { statusCode: null, message: token };
};

const createUser = async (userData) => {
  const { displayName, email, password } = userData;

  const displayNameError = validateDisplayName(displayName);
  if (displayNameError.statusCode) return displayNameError;

  const emailError = await validateEmail(email);
  if (emailError.statusCode) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError.statusCode) return passwordError;

  const user = await User.create(userData);

  delete user.dataValues.password;

  const token = createToken(user.dataValues);

  return { statusCode: null, message: token }; 
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return { statusCode: null, message: users };
};

module.exports = {
  login,
  createUser,
  getUsers,
};
