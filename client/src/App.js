import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Donate from './pages/Donate';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import SingleRecipe from './pages/SingleRecipe';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { StoreProvider } from './utils/State';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: 'http://localhost:3001/graphql', //change back to /graphql for build
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="fridge">
          <StoreProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/recipe/:id" component={SingleRecipe} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/donate" component={Donate} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
