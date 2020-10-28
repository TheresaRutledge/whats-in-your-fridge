//alex
import gql from 'graphql-tag';

export const QUERY_USER = gql `
query{
    me {
        username
        favorites
    }
}

`;

export const QUERY_COMMENTS = gql `
query commentByRecipeId($recipeId:String){
    commentByRecipeId(recipeId:$recipeId){
      commentText
      username
      recipeId
      createdAt
      _id
    }
  }
`

