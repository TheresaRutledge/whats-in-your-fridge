// Theresa
import { useReducer } from 'react';

import {
    UPDATE_RECIPES,
    UPDATE_INGREDIENTS,
    UPDATE_CURRENT_RECIPE,
    UPDATE_FAVORITE_RECIPES
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_RECIPES:
            return {
                ...state,
               recipes:[...action.recipes]
            };
        case UPDATE_INGREDIENTS:
           
            return {
                ...state,
                ingredients:action.ingredients
            };
            case UPDATE_CURRENT_RECIPE:
                return {
                    ...state,
                    currentRecipe:action.currentRecipe
                };
                case UPDATE_FAVORITE_RECIPES:
                    return {
                        ...state,
                        favoriteRecipes:action.favoriteRecipes
                    }

        default:
            return state;
    }

};

export function useRecipeReducer(initialState) {
    return useReducer(reducer, initialState);
}