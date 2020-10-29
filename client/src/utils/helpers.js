// Spoonacular API calls
const apiKey = '6ca6b5fd3ce64695a5dd539192a5af46';


// gets passed array of ingredients
export const getRecipes = async (ingredients) => {

    for (let i = 1; i < ingredients.length; i++) {
        ingredients[i] = '+' + ingredients[i];
    }
    const ingredientsString = ingredients.join(',');

    return await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&ignorePatry=true&apiKey=${apiKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(err => console.log(err));

}

export const getSingleRecipe = async (id) => {
    return await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(err => console.log(err));
}

//gets passed array of recipe IDs
export const getFavorites = async (recipeIds) => {
    let recipeIdString;
    if (recipeIds.length === 1) {
        recipeIdString = recipeIds[0]
    }
    else if (recipeIds.length === 0) {
        return false;
    } else {
        recipeIdString = recipeIds.join(',');
    }

    // return {
    //     "id": 553847,
    //     "title":"test recipe"
    // }

  
    return await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIdString}&includeNutrition=false&apiKey=${apiKey}`)
    .then(response => {
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(err => console.log(err));

}



