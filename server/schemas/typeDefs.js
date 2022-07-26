//import gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
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
        books(username: String):[Book]
    }`

    module.exports = typeDefs