import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!){
    createUser(username:$username, email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}`

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}`

export const SAVE_BOOK = gql`
    mutation saveBook($title: String, $bookId: String, $description: String, $authors: [String], $image: String){
        saveBook(title: $title, bookId: $bookId, description: $description, authors: $authors, image: $image){
            _id
            username
            email
            savedBooks{
                title
                bookId
                description
            }
        }
    }`

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!){
        deleteBook(bookId: $bookId){
            _id
            username
            email
            savedBooks{
                title
                bookId
                description
            }
        }
    }`

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
