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
    username: String
  }

type Auth {
    token: ID
    user: User
  }

type Query {
    commentByRecipeId(id:String): [Comment]
    me:User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!, username: String!): Auth 
    addComment(commentText: String!, recipeId: String!, username: String!):Comment
    updateComment(commentText: String, id:ID ): Comment
    deleteComment(id:ID): Comment
}

`;

module.exports = typeDefs;
// favorites are an array of objects? Do we need a [favorites] model to reference here?
// Query [User] and [Comment] because they are an array of users and comments...or are we only querying the User and their associated comment/s?
