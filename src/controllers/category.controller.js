const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const categoryData = req.body;

  const { statusCode, message } = await categoryService.createCategory(categoryData);

  if (statusCode) return res.status(statusCode).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createCategory,
};
