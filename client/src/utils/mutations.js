// Alex
import gql from "graphql-tag";

export const LOGIN = gql`
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

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!, $recipeId: String!) {
    addComment(commentText: $commentText, recipeId: $recipeId) {
      commentText
      username
      createdAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentText: String, $commentId: ID) {
    updateComment(commentText: $commentText, commentId: $commentId) {
      commentText
      username
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID) {
    deleteComment(commentId: $commentId) {
      commentText
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorites($recipeId: String!) {
    addFavorites(recipeId: $recipeId) {
      _id
      
    }
  }
`;

export const REMOVE_FAVORITES = gql`
  mutation removeFavorites($recipeId: String!) {
    removeFavorites(recipeId: $recipeId) {
      _id
    }
  }
`;

//hello world
