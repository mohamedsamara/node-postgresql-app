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
    console.log('newAuthor', newAuthor);

    try {
      const authorToUpdate = await database.author.findOne({
        where: { id: Number(id) },
      });

      if (authorToUpdate) {
        await database.author.updateAttributes(
          {
            name: newAuthor.name,
            books: newAuthor.books || authorToUpdate.books,
          },
          {
            where: { id: Number(id) },
            include: [
              {
                model: database.book,
                as: 'books',
              },
            ],
          },
        );

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
}

export default AuthorService;
