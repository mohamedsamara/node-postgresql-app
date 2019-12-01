const Book = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    author_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  book.associate = models => {
    book.belongsTo(models.author, {
      foreignKey: 'author_id',
    });
  };

  return book;
};

export default Book;
