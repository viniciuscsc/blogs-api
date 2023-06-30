const { Router } = require('express');

const categoryController = require('../controllers/category.controller');

const { validateToken } = require('../middlewares/token.validation');

const route = Router();

route.post('/categories', validateToken, categoryController.createCategory);
route.get('/categories', validateToken, categoryController.getCategories);

module.exports = route;
