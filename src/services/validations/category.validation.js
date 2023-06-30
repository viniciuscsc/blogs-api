const validateName = (name) => {
  if (!name) return { statusCode: 400, message: '"name" is required' };

  return { statusCode: null, message: '' };
};

module.exports = { validateName };
