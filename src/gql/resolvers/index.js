import merge from 'lodash.merge';

import users from './users.js';
import auth from './auth.js';
import books from './books.js';

export const resolvers = merge(
	users,
	auth,
	books
);
