import React from 'react';
import Search from '../components/Search';
import Recipes from '../components/Recipes';
import { useStoreContext } from '../utils/State';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';

const Home = () => {
  const [state] = useStoreContext();

  return (
    <div className="card bg-dark text-black">
      <div className="card-img-overlay">
        <Search />
        <Container fluid>
          <CardColumns className="mr-2">
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
