import { UserInputError } from "apollo-server-express";
import { addBookValidation } from "../../helpers/validations.js";

/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
    // Book:{
    //     async createdBy({book},context){
    //         const user = await context.di.model.Users.findById(book.createdBy).lean();
    //         if(user){
    //             return user
    //         }
    //     }
    // },
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllBooks:  async (parent, args, context) => {
			// context.di.authValidation.ensureThatUserIsLogged(context);

			// context.di.authValidation.ensureThatUserIsAdministrator(context);

			const sortCriteria = {title: 'asc', createdAt: 'desc' };
			return context.di.model.Books.find().populate('createdBy').sort(sortCriteria).lean();
		}
	},
	Mutation: {
        addBook : async(parent, {input}, context)=>{
            context.di.authValidation.ensureThatUserIsLogged(context);
            const user = await context.di.authValidation.getUser(context);
            const fields = {...input};
            if(!addBookValidation(input)){
                throw new UserInputError("All Fields are required to create a book")
            }
            const isNAmeAlreadyRegistered = await context.di.model.Books.findOne({ title:input.title }).lean();

			if (isNAmeAlreadyRegistered) {
				throw new UserInputError('Book Name is already in the database');
			}
            fields.createdBy = user._id;
            console.log(fields);
            const book = await new context.di.model.Books(fields).save();
            
            const returnBook = await context.di.model.Books.findById(book._id).populate('createdBy');
            console.log(returnBook);
            return returnBook;
        }
	}
};
