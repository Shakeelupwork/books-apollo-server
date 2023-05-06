import mongoose from 'mongoose';

import { UsersSchema, BooksSchema } from './schemas/index.js';

export const models = {
	Users: mongoose.model('users', UsersSchema),
	Books : mongoose.model('books', BooksSchema)
};
