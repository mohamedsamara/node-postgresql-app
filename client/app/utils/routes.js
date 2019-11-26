import Book from '../containers/Book';
import page404 from '../pages/404';
import Homepage from '../pages/Homepage';

const routes = [
  { path: '/', exact: true, name: 'Homepage', component: Homepage },
  { path: '/book', name: 'Book', component: Book },
  { path: '*', component: page404 },
];

export default routes;
