module.exports = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      references: { model: 'categories' },
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: 'blog_posts' },
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  postCategoryTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      {
        through: postCategoryTable,
        foreignKey: 'category_id',
        as: 'blogPosts',
        otherKey: 'post_id',
      });

    models.BlogPost.belongsToMany(models.Category,
      {
        through: postCategoryTable,
        foreignKey: 'post_id',
        as: 'categories',
        otherKey: 'category_id',
      });
  };

  return postCategoryTable;
};
