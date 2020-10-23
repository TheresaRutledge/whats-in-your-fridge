const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    favorites: [String]
  }

type Comment {
    _id:ID!
    commentText: String!
    recipeId: String
    createdAt: String
    username: String
  }

type Auth {
    token: ID
    user: User
  }

type Query {
    commentByRecipeId(recipeId:String): [Comment]
    me:User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, username: String!): Auth 
    addComment(commentText: String!, recipeId: String!):Comment
    updateComment(commentText: String, commentId:ID ): Comment
    deleteComment(commentId:ID): Comment
    addFavorites(recipeId:String!):User
    removeFavorites(recipeId:String):User
}

`;

module.exports = typeDefs;
// favorites are an array of objects? Do we need a [favorites] model to reference here?
// Query [User] and [Comment] because they are an array of users and comments...or are we only querying the User and their associated comment/s?
