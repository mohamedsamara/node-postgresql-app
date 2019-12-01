import AuthorService from '../services/author.service';
import Responder from '../helpers/responder.helper';

const responder = new Responder();

class AuthorController {
  static async getAuthors(req, res) {
    try {
      const authors = await AuthorService.getAuthors();
      if (authors.length > 0) {
        responder.setSuccess(
          200,
          'authors are successfully retrieved',
          authors,
        );
      } else {
        responder.setSuccess(200, 'No authors found');
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error);
      return responder.send(res);
    }
  }

  static async addAuthor(req, res) {
    if (!req.body.name) {
      responder.setError(400, 'some details are missing');
      return responder.send(res);
    }
    const newAuthor = req.body;
    try {
      const createdAuthor = await AuthorService.addAuthor(newAuthor);
      responder.setSuccess(
        201,
        'author has been added successfully',
        createdAuthor,
      );
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error.message);
      return responder.send(res);
    }
  }
}

export default AuthorController;
