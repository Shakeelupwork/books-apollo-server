import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type User {
		name:String
		email: String
		isAdmin: Boolean
		isActive: Boolean
		uuid: String
		registrationDate: String
		lastLogin: String
	}

	type Query {
		""" Get list of all users registered on database """
		listAllUsers: [User]
	}
`;