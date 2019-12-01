import { Router } from 'express';

import authorController from '../../controllers/author.controller';

const router = Router();

router.get('/', authorController.getAuthors);
router.post('/', authorController.addAuthor);
router.get('/:id', authorController.getAuthor);

export default router;
