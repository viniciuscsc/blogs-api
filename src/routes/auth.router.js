const { Router } = require('express');

const authController = require('../controllers/auth.controller');

const routers = Router();

routers.post('/', authController.login);

module.exports = routers;
