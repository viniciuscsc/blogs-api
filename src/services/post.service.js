const { BlogPost, PostCategory } = require('../models');

const {
  validatePostRequiredFields,
  validateExistingCategoryIds,
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

module.exports = {
  createPost,
  createPostsCategories,
};
