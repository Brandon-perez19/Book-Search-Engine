//import gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    
    type Book {
        description: String
        bookId: String
        title: String
        image: String
        authors: [String]
    }
    
    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }
    
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String):[Book]
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(title: String, bookId: String, description: String, authors: [String], image: String): User
        deleteBook(bookId: String!): User
    }
    
    type Auth {
        token: ID!
        user: User
    }`

    module.exports = typeDefs