require('dotenv').config();

// Spoonacular API calls
const apiKey = process.env.API_KEY;
// console.log('apikey',apikey)


// gets passed array of ingredients
export const getRecipes = async (ingredients) => {
  for (let i = 1; i < ingredients.length; i++) {
    ingredients[i] = "+" + ingredients[i];
  }
  const ingredientsString = ingredients.join(",");

  return await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&ignorePatry=true&apiKey=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const getSingleRecipe = async (id) => {
  return await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

//gets passed array of recipe IDs
export const getFavorites = async (recipeIds) => {
  let recipeIdString;
  if (recipeIds.length === 1) {
    recipeIdString = recipeIds[0];
  } else if (recipeIds.length === 0) {
    return false;
  } else {
    recipeIdString = recipeIds.join(",");
  }

  // return {
  //     "id": 553847,
  //     "title":"test recipe"
  // }

  return await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIdString}&includeNutrition=false&apiKey=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};


export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open('recipes', 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores 
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore('comments', { keyPath: 'key', autoIncrement:true });
      db.createObjectStore('favoriteRecipes', { keyPath: 'key',autoIncrement:true });
      // db.createObjectStore('currentRecipe', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = function (e) {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors, let us know
      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };

  });
}