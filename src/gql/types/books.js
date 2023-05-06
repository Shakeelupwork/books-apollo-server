import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
    input BookInput{
        title: String
		author: String
		coverImage: String
    }
	type Book {
		title: String
		author: String
		createdAt: String
        updatedAt: String
		uuid: String
		coverImage: String
        createdBy: User
	}

	type Query {
		""" Get list of all books registered on database """
		listAllBooks: [Book]
        """Get specific Book"""
        getBook(id: String!): Book
	}

    type Mutation {
		""" Add a book """
		addBook(input: BookInput!): Book
	}
`;