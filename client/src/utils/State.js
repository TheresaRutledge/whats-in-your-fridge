// Theresa
import React, {createContext, useContext} from 'react';
import {useRecipeReducer} from './reducers';

const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = (props) => {
    const [state,dispatch] = useRecipeReducer({
        ingredients:[],//not used
        recipes:[],//recipes that were searched for
        currentRecipe:{
            extendedIngredients:[]
        },
        favoriteRecipes:[]
    });
    return <Provider value={[state,dispatch]} {...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};