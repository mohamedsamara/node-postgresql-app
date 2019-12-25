import db from '../models';

const seed = async () => {
  await db.book.create({
    id: 1,
    title: 'book one',
    description: 'book one description',
    price: '20',
  });

  await db.book.create({
    id: 2,
    title: 'book two',
    description: 'book two description',
    price: '50',
  });

  await db.author.create({
    name: 'author one',
  });

  await db.author.create({
    name: 'author two',
  });
};

export default seed;
