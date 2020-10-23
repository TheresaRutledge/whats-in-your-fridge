//alex
import gql from 'graphql-tag';

export const QUERY_USER = gql `
{
    me {
        userName
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
    }
  }
`

