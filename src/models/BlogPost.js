module.exports = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'users' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });

  blogPostTable.associate = (models) => {
    blogPostTable.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
    });
  };

  return blogPostTable;
};
