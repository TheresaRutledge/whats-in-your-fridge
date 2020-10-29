import React, { useState, useEffect } from 'react';
import { UPDATE_INGREDIENTS, UPDATE_RECIPES } from '../../utils/actions';
import { useStoreContext } from '../../utils/State';
import { getRecipes } from '../../utils/helpers';

const Search = () => {
  const [state, dispatch] = useStoreContext();

  const handleChange = (event) => {
    let ingredients = event.target.value;
    ingredients = ingredients.split(',');
    dispatch({
      type: UPDATE_INGREDIENTS,
      ingredients: ingredients,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await getRecipes(state.ingredients)
      .then((recipes) => {
        dispatch({
          type: UPDATE_RECIPES,
          recipes: recipes,
        });
      })
      .then((data) => {
        console.log(state.recipes);
      });
  };

  return (
    <div>
      <form id="group-form" onSubmit={handleFormSubmit}>
        <div id="groups">
          <div>
            <h3 className="title">
              Search for recipes based on whats in your fridge!
            </h3>
            <label htmlFor="group-1">Ingredients:</label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="group-1"
              onChange={handleChange}
            />
            <button className="btn btn-success" type="submit">
              Find Recipes!
            </button>
          </div>
        </div>
        <p>Seperate ingredients by a comma</p>
      </form>
    </div>
  );
};

export default Search;
