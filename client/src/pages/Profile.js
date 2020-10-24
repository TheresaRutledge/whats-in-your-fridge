import React from 'react';
import {getFavorites} from '../utils/helpers'; //function to call api for recipes that have been favorited. takes an array of recipe ids as parameter


const Profile= ()=> {

const recipeIds = ['553847','556510','556510']; //just for testing
let favoriteRecipes =[];

const getRecipes = async () => await getFavorites(recipeIds) 
.then(response => {
    favoriteRecipes = response;
    console.log(favoriteRecipes);
})
.catch(err=>console.log(err));

getRecipes();
//above code used to test api. Should probably be useEffect instead to update favoriteRecipes in state. use type UPDATE_FAVORITE_RECIPES


return (
<div>Favorites Page</div>
)
}

export default Profile;

