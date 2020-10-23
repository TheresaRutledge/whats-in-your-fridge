import React from 'react';
import Search from "../components/Search";
import Recipes from "../components/Recipes";
import { useStoreContext } from '../utils/State';

const Home = () => {
    const [state,dispatch] = useStoreContext();

    return (
        <div className='container'>
            <Search />
            {state.recipes.map(recipe => (
                <Recipes key ={recipe.id} recipe={recipe} />
            ))}

        </div>

    )
};

export default Home;