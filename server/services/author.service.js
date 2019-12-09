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

  static async updateAuthorBooks(id, newAuthor) {
    try {
      await database.book
        .findAll({
          where: {
            [database.Sequelize.Op.or]: [
              { id: newAuthor.books },
              { author_id: id },
            ],
          },
        })
        .then(books => {
          return database.Sequelize.Promise.all(
            books.map(async book => {
              if (!newAuthor.books.includes(book.id)) {
                await book.update({ author_id: null });
              } else {
                await book.update({ author_id: Number(id) });
              }
            }),
          );
        });
    } catch (error) {
      throw error;
    }
  }

  static async updateAuthor(id, newAuthor) {
    try {
      const authorToUpdate = await database.author.findOne({
        where: { id: Number(id) },
      });

      if (authorToUpdate) {
        await database.author.update(newAuthor, { where: { id: Number(id) } });

        return newAuthor;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

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

  static async deleteAuthor(id) {
    try {
      const authorToDelete = await database.author.findOne({
        where: { id: Number(id) },
      });

      if (authorToDelete) {
        const deletedAuthor = await database.author.destroy({
          where: { id: Number(id) },
        });
        return deletedAuthor;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthorService;
