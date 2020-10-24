//BUG - this page isn't rendered when the path is followed
import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { UPDATE_CURRENT_RECIPE } from '../utils/actions';
import { getSingleRecipe } from '../utils/helpers';
import { useStoreContext } from '../utils/State';

// const { id } = useParams;
// const getRecipe = async () => {
//       await getSingleRecipe(716429);
// }
// const recipe = getRecipe();
// console.log(recipe);

const SingleRecipe = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

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
    console.log(ingredients);
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
        </div>


    )
};

export default SingleRecipe;