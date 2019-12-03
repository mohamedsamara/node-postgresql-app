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

  static async getAuthor(id) {
    try {
      const author = await database.author.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.book,
            as: 'books',
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
