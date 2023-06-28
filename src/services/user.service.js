const { User } = require('../models');
const { createToken } = require('../utils/JWT');

const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('./validations/inputValuesValidation');

const createUser = async (userData) => {
  const { displayName, email, password } = userData;

  const displayNameError = validateDisplayName(displayName);
  console.log(displayNameError);
  if (displayNameError.type) return displayNameError;

  const emailError = await validateEmail(email);
  console.log(emailError);
  if (emailError.type) return emailError;

  const passwordError = validatePassword(password);
  console.log(passwordError);
  if (passwordError.type) return passwordError;
  
  const newUser = User.create(userData);
  
  const payload = { id: newUser.id };
  const token = createToken(payload);
  
  return { type: null, message: token };
};

module.exports = {
  createUser,
};
