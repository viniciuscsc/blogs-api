const { Router } = require('express');

const userController = require('../controllers/user.controller');

const routers = Router();

routers.post('/', userController.createUser);

module.exports = routers;
