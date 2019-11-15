class BookController {
  static async getAllBooks(req, res) {
    const allBooks = [{ name: 'book1' }, { name: 'book2' }];
    res.json(allBooks);
  }
}

export default BookController;
