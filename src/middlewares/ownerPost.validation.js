const { BlogPost } = require('../models');

const validateOwnerPost = async (req, res, next) => {
  const userId = req.user.id;

  const postId = req.params.id;
  const post = await BlogPost.findByPk(+postId);

  if (!post) return res.status(404).json({ message: 'Post does not exist' }); 

  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

module.exports = { validateOwnerPost };
