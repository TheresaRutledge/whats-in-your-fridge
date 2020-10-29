import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/images/404.jpeg';

class NoMatch extends React.Component {
  render() {
    return (
      <div className="page-container">
        <img
          style={{ width: '100%' }}
          src={PageNotFound}
          alt="background for not match page"
        />
        <p style={{ textAlign: 'center' }}>
          <Link to="/">Go to Home</Link>
        </p>
      </div>
    );
  }
}
export default NoMatch;
