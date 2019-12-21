import db from '../models';

const seed = async () => {
  await db.book.create({
    title: 'book one',
    description: 'book one description',
    price: '20',
  });

  await db.book.create({
    title: 'book two',
    description: 'book two description',
    price: '50',
  });
};

export default seed;
