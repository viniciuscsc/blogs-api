const postService = require('../services/post.service');

const createPost = async (req, res) => {
  const userId = req.user.id;
  const postData = req.body;

  const { statusCode, message } = await postService.createPost(userId, postData);

  if (statusCode) return res.status(statusCode).json({ message });

  await postService.createPostsCategories(message.id, postData);

  return res.status(201).json(message);
};

const getPosts = async (_req, res) => {
  const { statusCode, message } = await postService.getPosts();
  
  if (statusCode) return res.status(statusCode).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createPost,
  getPosts,
};
