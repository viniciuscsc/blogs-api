const { User } = require('../../models');

const validateDisplayName = (displayName) => {
  // Se a requisição não tiver o campo displayName devidamente preenchido com 8 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http 400
  // { "message": "\"displayName\" length must be at least 8 characters long" }

  const minDisplayNameSize = 8;
  
  if (displayName.length < minDisplayNameSize) {
    return {
      type: 'INVALID_INPUT',
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return { type: null, message: '' };
};

const validateEmail = async (email) => {
  // Se a requisição não tiver o campo email devidamente preenchido com o formato <prefixo@dominio>, o resultado retornado deverá ser conforme exibido abaixo, com um status http 400:
  // { "message": "\"email\" must be a valid email" }

  const regexEmail = /\S+@\S+\.\S+/;
  const isValidEmail = regexEmail.test(email);
  
  if (!isValidEmail) {
    return { type: 'INVALID_INPUT', message: '"email" must be a valid email' };
  }

  // Se a requisição enviar o campo email com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http 409:
  // { "message": "User already registered" }

  const user = await User.findOne({ where: { email } });

  if (user) return { type: 'INVALID_EMAIL', message: 'User already registered' };

  return { type: null, message: '' };
};

const validatePassword = (password) => {
  // Se a requisição não tiver o campo password devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http 400:
  // { "message": "\"password\" length must be at least 6 characters long" }
  
  if (password.length < 6) {
    return {
      type: 'INVALID_INPUT',
      message: '"password" length must be at least 6 characters long',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};
