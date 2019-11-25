import Test from '../components/Test';
import page404 from '../pages/404';

const routes = [
  { path: '/', exact: true, name: 'Test', component: Test },
  { path: '/book/list', name: 'Test', component: Test },
  { path: '*', component: page404 },
];

export default routes;
