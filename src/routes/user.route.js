const { Router } = require('express');

const userController = require('../controllers/user.controller');

const { validateToken } = require('../middlewares/tokenValidation');

const route = Router();

route.post('/login', userController.login);
route.post('/user', userController.createUser);
route.get('/user', validateToken, userController.getUsers);

module.exports = route;
