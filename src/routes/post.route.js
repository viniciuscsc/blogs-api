const { Router } = require('express');

const postController = require('../controllers/post.controller');

const { validateToken } = require('../middlewares/token.validation');

const route = Router();

route.post('/post', validateToken, postController.createPost);

module.exports = route;
