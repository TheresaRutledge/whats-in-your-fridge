import React, { useState } from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

const Donate = () => {
  const [donateionAmount, setDonationAmount] = useState();
  const handleChange = (event) => {
    if (event.target.value) {
      setDonationAmount(event.target.value);
    }
  };

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
          <input
            id="amount"
            type="number"
            name="amount"
            min="10"
            onChange={handleChange}
          ></input>
        </div>
      </form>
      <form method="POST" action="/donate/thanks" id="card">
        <div>
          <label for="cardholder-name">Cardholder name: </label>
          <input
            id="cardholder-name"
            type="text"
            name="cardholder-name"
            // value="{{name}}"
          ></input>
        </div>
        <Elements stripe={stripePromise}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Elements>
        <div id="card-errors"></div>
        <div>
          <button id="card-button" data-secret="{{intentSecret}}">
            {donateionAmount ? `Donate $${donateionAmount} USD` : `Donate`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Donate;
