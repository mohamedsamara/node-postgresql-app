import BookService from '../services/book.service';

class BookController {
  static async getAllBooks(req, res) {
    const allBooks = [{ name: 'book1' }, { name: 'book2' }];
    res.json(allBooks);
  }

  static async addBook(req, res) {
    req.body.title = 'test';
    req.body.price = 10;
    req.body.description = 'test desc';

    const newBook = req.body;
    try {
      const createdBook = await BookService.addBook(newBook);

      res.json(createdBook);
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default BookController;
