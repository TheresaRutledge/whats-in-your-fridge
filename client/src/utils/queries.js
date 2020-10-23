//alex
import gql from 'graphql-tag';

export const QUERY_USER = gql `
{
    me {
        userName
        email
        favorites
    }
}

`;

export const QUERY_COMMENT = gql `
{
    comment {
        commentText
        recipeId
        createAt
        user {
            User
        }
    }
}
`
// query getComment(id:String) {
// //     commentbyRecipeId(comment:$comment)
// // }
