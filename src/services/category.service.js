const { Category } = require('../models');

const { validateName } = require('./validations/category.validation');

const createCategory = async (categoryData) => {
  const { name } = categoryData;

  const nameError = validateName(name);
  if (nameError.statusCode) return nameError;

  const category = await Category.create(categoryData);

  return { statusCode: null, message: category };
};

module.exports = {
  createCategory,
};
