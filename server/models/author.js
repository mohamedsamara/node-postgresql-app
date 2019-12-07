const Author = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  author.associate = models => {
    author.hasMany(models.book, {
      foreignKey: 'author_id',
      as: 'books',
      // onDelete: 'CASCADE',
    });
  };

  return author;
};

export default Author;
