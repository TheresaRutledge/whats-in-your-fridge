const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    favorites: [String]
  }

type Comment {
    commentText: String!
    recipeId: String
    createdAt: String
    user: User
  }

type Auth {
    token: ID
    user: User
  }

type Query {
    user: User
    comment: Comment
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, username: String!): Auth 
    addComment(commentText: String!, recipeId: String!, user: User)
    updateComment(commentText: String, recipeId: String, user: User ): Comment
    deleteComment(commentText: String, recipeId: String, user: User): Comment
}

`;

module.exports = typeDefs;
// favorites are an array of objects? Do we need a [favorites] model to reference here?
// Query [User] and [Comment] because they are an array of users and comments...or are we only querying the User and their associated comment/s?
