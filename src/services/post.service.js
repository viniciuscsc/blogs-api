const { BlogPost, PostCategory, User, Category } = require('../models');

const {
  validatePostRequiredFields,
  validateExistingCategoryIds,
  validateExistingPostId,
} = require('./validations/post.validation');

const createPost = async (userId, postData) => {
  const { title, content, categoryIds } = postData;

  const requiredFieldsError = validatePostRequiredFields(postData);
  if (requiredFieldsError.statusCode) return requiredFieldsError;

  const categoryIdsError = await validateExistingCategoryIds(categoryIds);
  if (categoryIdsError.statusCode) return categoryIdsError;

  const newPost = await BlogPost.create(
    { title, content, userId, updated: Date.now(), published: Date.now() },
  );  

  return { statusCode: null, message: newPost };
};

const createPostsCategories = async (postId, postData) => {
  const { categoryIds } = postData;

  const categories = categoryIds
    .map((categoryId) => PostCategory.create({ postId, categoryId }));

  await Promise.all(categories);
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      {
        model: User, 
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return { statusCode: null, message: posts };
};

const getPostById = async (postId) => {
  const postIdError = await validateExistingPostId(postId);
  if (postIdError.statusCode) return postIdError;

  const post = await BlogPost.findByPk(postId, {
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      {
        model: User, 
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return { statusCode: null, message: post };
};

module.exports = {
  createPost,
  createPostsCategories,
  getPosts,
  getPostById,
};
