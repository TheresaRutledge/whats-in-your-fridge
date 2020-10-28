import React from "react";
import Search from "../components/Search";
import Recipes from "../components/Recipes";
import { useStoreContext } from "../utils/State";
import coverImage from "../assets/images/food-fridge.jpg";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="card bg-dark text-black">
      <img src={coverImage} className="card-img" alt="..."></img>
      <div className="card-img-overlay">
        <Search />
        {state.recipes.map((recipe) => (
          <Recipes key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
