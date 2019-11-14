import { Router } from 'express';

const router = Router();

// router.get('/', (res, req) => {
//   const allBooks = [{ name: 'book1' }, { name: 'book2' }];
//   res.json(allBooks);
// });

router.get('/', (req, res) => {
  //   const allBooks = [{ name: 'book1' }, { name: 'book2' }];
  //   res.json(allBooks);
});

// router.post('/', BookController.addBook);
// router.get('/:id', BookController.getABook);
// router.put('/:id', BookController.updatedBook);
// router.delete('/:id', BookController.deleteBook);

export default router;
