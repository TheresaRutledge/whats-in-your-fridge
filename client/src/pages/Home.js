import React from "react";
import Search from "../components/Search";
import Recipes from "../components/Recipes";
import { useStoreContext } from "../utils/State";
import coverImage from "../assets/images/food-fridge.jpg";
// import { Container } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
// import Bounce from "react-reveal/Bounce";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="card bg-dark text-black">
      {/* <img src={coverImage} className="card-img" alt="..."></img> */}
      <div className="card-img-overlay">
        <Search />
        <Container fluid>
          <CardColumns>
            {state.recipes.map((recipe) => (
              <Recipes key={recipe.id} recipe={recipe} />
            ))}
          </CardColumns>
        </Container>
      </div>
    </div>
  );
};

export default Home;
