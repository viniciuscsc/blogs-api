const { Router } = require('express');

const postController = require('../controllers/post.controller');

const { validateToken } = require('../middlewares/token.validation');
const { validateOwnerPost } = require('../middlewares/ownerPost.validation');

const route = Router();

route.post('/post', validateToken, postController.createPost);
route.get('/post', validateToken, postController.getPosts);
route.get('/post/:id', validateToken, postController.getPostById);
route.put('/post/:id', validateToken, validateOwnerPost, postController.updatePost);
route.delete('/post/:id', validateToken, validateOwnerPost, postController.deletePost);

module.exports = route;
