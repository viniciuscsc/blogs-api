module.exports = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  userTable.associate = (models) => {
    userTable.hasMany(models.BlogPost,
      { foreignKey: 'user_id', as: 'blog_posts'});
  };

  return userTable;
};
