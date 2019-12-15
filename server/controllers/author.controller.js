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

  static async getAuthorsList(req, res) {
    try {
      const authors = await AuthorService.getAuthorsList();
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

  static async updateAuthor(req, res) {
    const newAuthor = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    try {
      const updatedAuthor = await AuthorService.updateAuthor(id, newAuthor);
      if (!updatedAuthor) {
        responder.setError(404, `cannot find author with the id: ${id}`);
      } else {
        responder.setSuccess(200, 'author updated', updatedAuthor);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(404, error);
      return responder.send(res);
    }
  }

  static async updateAuthorBook(req, res) {
    const newAuthor = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    if (!newAuthor) {
      responder.setError(400, 'some details are missing');
      return responder.send(res);
    }

    try {
      const updatedAuthor = await AuthorService.updateAuthorBooks(
        id,
        newAuthor,
      );
      if (!updatedAuthor) {
        responder.setError(404, `cannot find author with the id: ${id}`);
      } else {
        responder.setSuccess(200, 'author updated', updatedAuthor);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(404, error);
      return responder.send(res);
    }
  }

  static async getAuthor(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    try {
      const author = await AuthorService.getAuthor(id);

      if (!author) {
        responder.setError(404, `cannot find author with the id ${id}`);
      } else {
        responder.setSuccess(200, 'found author', author);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(404, error);
      return responder.send(res);
    }
  }

  static async deleteAuthor(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      responder.setError(400, 'please enter a valid numeric value');
      return responder.send(res);
    }

    try {
      const authorToDelete = await AuthorService.deleteAuthor(id);

      if (authorToDelete) {
        responder.setSuccess(200, 'author has been deleted successfully');
      } else {
        responder.setError(404, `author with the id ${id} cannot be found`);
      }
      return responder.send(res);
    } catch (error) {
      responder.setError(400, error);
      return responder.send(res);
    }
  }
}

export default AuthorController;
