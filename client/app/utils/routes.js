import Book from '../containers/Book';
import Author from '../containers/Author';
import Page404 from '../pages/404';
import Homepage from '../pages/Homepage';

const routes = [
  { path: '/', exact: true, name: 'Homepage', component: Homepage },
  { path: '/book', name: 'Book', component: Book },
  { path: '/author', name: 'Author', component: Author },
  { path: '*', component: Page404 },
];

export default routes;
