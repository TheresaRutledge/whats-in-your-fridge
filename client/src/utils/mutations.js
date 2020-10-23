// Alex
import gql from 'graphql-tag';

export const LOGIN = gql `
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}

`;

export const ADD_USER = gql `
mutation addUser($email: String!, $password: String!, $username: String!){
    addUser(email: $email, password: $password, username: $username) {
        token
        user {
            _id
        }
    }
}

`

export const ADD_COMMENT = gql `
mutation addComment($commentText: Strinq!, recipeId: String!) {
    addComment(commentText: $commentText) {

    }
}


`

export const UPDATE_COMMENT = gql ``

export const DELETE_COMMENT = gql ``

