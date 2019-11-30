import { FETCH_AUTHORS } from './constant';

export const fetchAuthors = authors => ({
  type: FETCH_AUTHORS,
  payload: authors,
});
