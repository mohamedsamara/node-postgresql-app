import database from '../models';

class BookService {
  static async getBooks() {
    try {
      return await database.book.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getBooksList() {
    try {
      return await database.book.findAll({
        attributes: [
          ['id', 'value'],
          ['title', 'label'],
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

  static async addBook(newBook) {
    try {
      return await database.book.create(newBook);
    } catch (error) {
      throw error;
    }
  }

  static async updateBook(id, newBook) {
    try {
      const bookToUpdate = await database.book.findOne({
        where: { id: Number(id) },
      });

      if (bookToUpdate) {
        await database.book.update(newBook, { where: { id: Number(id) } });

        return newBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getBook(id) {
    try {
      const book = await database.book.findOne({
        where: { id: Number(id) },
      });

      return book;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await database.book.findOne({
        where: { id: Number(id) },
      });

      if (bookToDelete) {
        const deletedBook = await database.book.destroy({
          where: { id: Number(id) },
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
