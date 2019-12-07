import { Router } from 'express';

import authorController from '../../controllers/author.controller';

const router = Router();

router.get('/', authorController.getAuthors);
router.get('/list', authorController.getAuthorsList);
router.post('/', authorController.addAuthor);
router.get('/:id', authorController.getAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
