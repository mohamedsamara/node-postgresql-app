import { Router } from 'express';

import book from './book';
import author from './author';

const router = Router();

router.use('/book', book);
router.use('/author', author);

export default router;
