import React from 'react';
import {Link} from 'react-router-dom';

const Recipes = ({recipe}) => {
    const missingIngredients = recipe.missedIngredients.map(item=>{
        return " "+ item.name
    });

    return (
        <div>
            <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{`${recipe.missedIngredientCount} Missing Ingredients: ${missingIngredients} `}</p>
                    <a href="#" className="btn btn-primary">View Comments: 3</a>
                    <p id='favorite'>Star</p>
                </div>
        </div>
    )
};

export default Recipes;
