import { Router } from 'express';

import BookController from '../../controllers/book.controller';

const router = Router();

router.get('/', BookController.getBooks);
router.post('/', BookController.addBook);
router.get('/:id', BookController.getBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router;
