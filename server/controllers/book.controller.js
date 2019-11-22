import BookService from '../services/book.service';
import Responder from '../helpers/responder.helper';

const responder = new Responder();

class BookController {
  static async getBooks(req, res) {
    try {
      const books = await BookService.getBooks();
      if (books.length > 0) {
        responder.setSuccess(200, 'books are successfully retrieved', books);
      } else {
        responder.setSuccess(200, 'No books found');
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error);
      return responder.send(res);
    }
  }

  static async addBook(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      responder.setError(400, 'some details are missing');
      return responder.send(res);
    }
    const newBook = req.body;
    try {
      const createdBook = await BookService.addBook(newBook);
      responder.setSuccess(
        201,
        'book has been added successfully',
        createdBook,
      );
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error.message);
      return responder.send(res);
    }
  }

  static async updateBook(req, res) {
    const newBook = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }
    try {
      const updatedBook = await BookService.updateBook(id, newBook);
      if (!updatedBook) {
        responder.setError(404, `cannot find book with the id: ${id}`);
      } else {
        responder.setSuccess(200, 'book updated', updatedBook);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(404, error);
      return responder.send(res);
    }
  }

  static async getBook(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    try {
      const book = await BookService.getBook(id);

      if (!book) {
        responder.setError(404, `cannot find book with the id ${id}`);
      } else {
        responder.setSuccess(200, 'found book', book);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(404, error);
      return responder.send(res);
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    try {
      const bookToDelete = await BookService.deleteBook(id);

      if (bookToDelete) {
        responder.setSuccess(200, 'book has been deleted successfully');
      } else {
        responder.setError(404, `book with the id ${id} cannot be found`);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error);
      return responder.send(res);
    }
  }
}

export default BookController;
