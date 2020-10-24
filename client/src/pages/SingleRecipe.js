
import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { UPDATE_CURRENT_RECIPE } from '../utils/actions';
import { getSingleRecipe } from '../utils/helpers';
import { useStoreContext } from '../utils/State';
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import {QUERY_COMMENTS} from "../utils/queries";
import {useQuery} from "@apollo/react-hooks";

const SingleRecipe = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
    const {loading, data} = useQuery(QUERY_COMMENTS,{
        variables:{recipeId:id}
    });
    const comments = data ? data.commentByRecipeId : [];


    useEffect( async () => {
        await getSingleRecipe(id)
            .then(recipe => {
                dispatch({
                    type: UPDATE_CURRENT_RECIPE,
                    currentRecipe: recipe
                })
            })
    },[id])

    const ingredients = state.currentRecipe.extendedIngredients;//why does this show an array in console but comes up as undef?
    // console.log(ingredients);
// const ingredients = state.currentRecipe.extendedIngredients.map(item => {
//     return item.name
// })

    return (
        <div>
            <h1>{state.currentRecipe.title}</h1>
            <img src={state.currentRecipe.image} />
            <h3>Ingredients</h3>
            {/* <ul>
                {ingredients.forEach(item => {
                    return <li>{item}</li>
                   
                })}
            </ul> */}
            <h3>Directions:</h3>
            <p>{state.currentRecipe.instructions}</p>
            <CommentForm></CommentForm>
            {comments.map(comment=> {
                return <Comment 
                key={comment._id}
                commentText={comment.commentText}
                username={comment.username}
                createdAt={comment.createdAt}
                ></Comment>
            })} 
        </div>


    )
};

export default SingleRecipe;