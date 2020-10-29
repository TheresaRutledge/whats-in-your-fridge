import React, { useEffect } from "react";
import { UPDATE_FAVORITE_RECIPES } from "../utils/actions";
import { getFavorites } from "../utils/helpers"; //function to call api for recipes that have been favorited. takes an array of recipe ids as parameter
import { QUERY_USER } from "../utils/queries";
import { useStoreContext } from "../utils/State";
import { useQuery } from "@apollo/react-hooks";
import Recipes from "../components/Recipes";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

const Profile = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_USER);
  const recipeIds = data ? data.me.favorites : "";

  useEffect(() => {
    console.log("in use effect");
    async function fetchRecipes() {
      const recipes = await getFavorites(recipeIds).catch((err) =>
        console.log("Error", err)
      );
      if (!recipes.code && state.favoriteRecipes.length === 0) {
        dispatch({
          type: UPDATE_FAVORITE_RECIPES,
          favoriteRecipes: recipes,
        });
      }
      console.log(state.favoriteRecipes);
    }
    if (recipeIds) {
      fetchRecipes();
    }
  }, [recipeIds, dispatch, state.favoriteRecipes]);

  return (
    <div>
      <h2>Your Favorites!</h2>
      <Container fluid>
        <CardColumns>
          {recipeIds.length > 0 && state.favoriteRecipes.length === 0 ? (
            "Oops something went wrong"
          ) : recipeIds.length > 0 ? (
            state.favoriteRecipes.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <h4>You don't have any favorites yet!</h4>
          )}
        </CardColumns>
      </Container>
    </div>
  );
};

export default Profile;
