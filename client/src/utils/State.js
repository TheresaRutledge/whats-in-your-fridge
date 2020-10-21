// Theresa
import React, {createContext, useContext} from 'react';
import {useRecipeReducer} from './reducers';

const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = (props) => {
    const [state,dispatch] = useRecipeReducer({
        ingredients:[],
        recipes:[]
    });
    return <Provider value={[state,dispatch]} {...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};