import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me{
        _id
        username
        email
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
}`

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
    mutation saveBook($bookData: String!){
        saveBook(bookData: $bookData){
            _id
            authors
            description
            bookId
            image
            link
            title
            user {
                _id
                username
            }
        }
    }`

    export const DELETE_BOOK = gql`
    mutation deleteBook($bookData: String!){
        deleteBook(bookId: $bookId){
            _id
            authors
            description
            bookId
            image
            link
            title
            user {
                _id
                username
            }
        }
    }`

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
