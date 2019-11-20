const Book = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
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
  return book;
};

export default Book;
