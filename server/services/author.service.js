import database from '../models';

class AuthorService {
  static async getAuthors() {
    try {
      return await database.author.findAll();
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
}

export default AuthorService;
