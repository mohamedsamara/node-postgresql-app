import Book from '../containers/Book';
import page404 from '../pages/404';

const routes = [
  { path: '/', name: 'Book', component: Book },
  { path: '*', component: page404 },
];

export default routes;
