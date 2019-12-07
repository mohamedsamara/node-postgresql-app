import database from '../models';

class AuthorService {
  static async getAuthors() {
    try {
      return await database.author.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getAuthorsList() {
    try {
      return await database.author.findAll({
        attributes: [
          ['id', 'value'],
          ['name', 'label'],
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  static async addAuthor(newAuthor) {
    try {
      return await database.author.create(newAuthor);
    } catch (error) {
      throw error;
    }
  }

  static async updateAuthor(id, newAuthor) {
    try {
      const authorToUpdate = await database.author.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.book,
            as: 'books',
            attributes: [
              ['id', 'value'],
              ['title', 'label'],
            ],
          },
        ],
      });

      if (authorToUpdate) {
        await database.author.update(newAuthor, {
          where: { id: Number(id) },
          include: [
            {
              model: database.book,
              as: 'books',
              attributes: [
                ['id', 'value'],
                ['title', 'label'],
              ],
            },
          ],
        });

        return newAuthor;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // static async updateAuthor(id) {
  //   const newAuthor = [2, 4, 5];

  //   try {
  //     database.book
  //       .findAll({
  //         where: { id: { $in: newAuthor } },
  //       })
  //       .then(books => {
  //         console.log('books are =>', books);

  //         const updateBooksPromises = books.map(book => {
  //           return book.updateAttributes({
  //             author_id: id,
  //           });
  //         });
  //         return database.Sequelize.Promise.all(updateBooksPromises);
  //       })
  //       .then(updateBooks => {
  //         return updateBooks;
  //       });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async getAuthor(id) {
    try {
      const author = await database.author.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.book,
            as: 'books',
            attributes: [
              ['id', 'value'],
              ['title', 'label'],
            ],
          },
        ],
      });

      return author;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthorService;
