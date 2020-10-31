import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ADD_FAVORITE, REMOVE_FAVORITES } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import '../../index.css';
import { idbPromise } from '../../utils/helpers';

const Recipes = ({ recipe, reRender }) => {
  let missingIngredients;
  if (recipe.missedIngredients) {
    missingIngredients = recipe.missedIngredients.map((item) => {
      return ' ' + item.name;
    });
  }

  const { loading, data, refetch } = useQuery(QUERY_USER);
  const favorites = data ? data.me.favorites : [];

  const [addFavorites] = useMutation(ADD_FAVORITE, {
    update(cache, { data: { addFavorites } }) {
      refetch();
    },
  });

  const [removeFavorites] = useMutation(REMOVE_FAVORITES, {
    update(cache, { data: { removeFavorites } }) {
      refetch();
      reRender();
    },
  });

  let checkIfFavorite = () => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] === recipe.id.toString()) {
        return true;
      }
    }
    return false;
  };
  let isFavorite = checkIfFavorite();

  const updateFavorite = () => {
    if (isFavorite) {
      console.log('removing ', recipe.id.toString());
      removeFavorites({
        variables: { recipeId: recipe.id.toString() },
      });
      idbPromise('favoriteRecipes', 'delete', [
        favorites,
        recipe.id.toString(),
      ]);
    }
    if (!isFavorite) {
      console.log('adding ', recipe.id.toString());
      addFavorites({
        variables: { recipeId: recipe.id.toString() },
      });
      idbPromise('favoriteRecipes', 'put', [
        ...favorites,
        recipe.id.toString(),
      ]);
    }
  };

  return (
    <Card border="light" className="mx-4 my-3 recipe-cards">
      <Link to={`/recipe/${recipe.id}`}>
        <Card.Img src={recipe.image} className="card-img-top mb-2 " alt="..." />
      </Link>
      <div className="mb-2 mx-2">
        <h5 className="card-title">{recipe.title}</h5>
        {missingIngredients ? (
          <p className="card-text">
            {`${recipe.missedIngredientCount}`}{' '}
            <span className="font-weight-bold">Missing Ingredients:</span>{' '}
            {`${missingIngredients} `}
          </p>
        ) : (
          ''
        )}

        {Auth.loggedIn() ? (
          <button onClick={updateFavorite}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-star-fill"
              fill={isFavorite ? 'yellow' : 'currentColor'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </button>
        ) : (
          ''
        )}
      </div>
    </Card>
  );
};

export default Recipes;
