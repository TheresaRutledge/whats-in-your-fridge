//BUG - this page isn't rendered when the path is followed
import React from 'react';
import { useParams } from 'react-router-dom';
import { getSingleRecipe } from '../utils/helpers';

const singleRecipe =()=> {
    const { id } = useParams;
    const recipe = getSingleRecipe(id);


    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} />
            <h3>Ingredients</h3>
            <ul>
        {recipe.extendedIngredients.map(item=>{
            return <li>item.name</li>
        })}
    </ul>
            <h3>Directions:</h3>
            <p>{recipe.instructions}</p>
        </div>
   
    )
};

export default singleRecipe;