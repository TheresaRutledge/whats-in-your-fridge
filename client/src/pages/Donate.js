import React from 'react';

const Donate = () => {
  return (
    <div>
      <h1>Donate</h1>
      <p>Thank you for donating!</p>
      <form method="POST" action="">
        <div>
          <label for="name">Name: </label>
          <input id="name" type="text" name="name"></input>
        </div>
        <div>
          <label for="email">Email address: </label>
          <input id="email" type="email" name="email"></input>
        </div>
        <div>
          <label for="amount">Amount: </label>
          <input id="amount" type="number" name="amount" min="10"></input>
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Donate;
