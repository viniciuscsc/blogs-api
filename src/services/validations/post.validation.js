const { Category, BlogPost } = require('../../models');

const validatePostRequiredFields = (postData) => {
  const { title, content, categoryIds } = postData;

  if (!title || !content || !categoryIds || categoryIds.length === 0) {
    return { statusCode: 400, message: 'Some required fields are missing' };
  }

  return { statusCode: null, message: '' };
};

const validateExistingCategoryIds = async (categoryIds) => {
  const categoriesDB = await Category.findAll();
  const categoryIdsDB = categoriesDB
    .map(({ id }) => id);

  const categoryIdsExist = categoryIds
    .every((categoryId) => categoryIdsDB.includes(categoryId));

  if (!categoryIdsExist) {
    return { statusCode: 400, message: 'one or more "categoryIds" not found' };
  }

  return { statusCode: null, message: '' }; 
};

const validateExistingPostId = async (postId) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) return { statusCode: 404, message: 'Post does not exist' };

  return { statusCode: null, message: '' }; 
};

module.exports = {
  validatePostRequiredFields,
  validateExistingCategoryIds,
  validateExistingPostId,
};
