import db from '../models';
import { books, authors } from './data';

const seed = async () => {
  books.map(async item => {
    await db.book.create(item);
  });

  authors.map(async item => {
    await db.author.create(item);
  });

  return { books, authors };
};

export default seed;
