const Author = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return author;
};

export default Author;
