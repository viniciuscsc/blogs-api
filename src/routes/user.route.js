const { Router } = require('express');

const userController = require('../controllers/user.controller');

const route = Router();

route.post('/login', userController.login);
route.post('/user', userController.createUser);

module.exports = route;
