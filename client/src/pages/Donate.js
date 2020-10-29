import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripeKey =
  'pk_test_51HhCS7GO36rYcXmbjchTWLEOjxcgzEepOk8QhKuPZ0Oyx4X3uH4yXdYj5jpGSKQ1hUkb6yyzTOGTk8Mqmzpp7k7S00ouymSUty';

toast.configure();

const Donate = () => {
  // amount to donate
  const [donation] = React.useState({
    name: 'SF Marin Food Bank',
    amount: 20.0,
  });
  // this one work
  // const handleToken = async (token, addresses) => {
  //   console.log({ token, addresses });
  // };

  // this one do not work
  const handleToken = async (token, addresses) => {
    const response = await axios
      .post('http://localhost:3000/StripeDonate', {
        token,
        donation,
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    // const { status } = response.data;
    // console.log('Response:', response.data);
    // if (status === 'success') {
    //   toast('Success! Check email for details', { type: 'success' });
    //   console.log(status);
    // } else {
    //   toast('Something went wrong', { type: 'error' });
    // }
    console.log(response);
  };

  return (
    <div className="card bg-dark text-black">
      <div className="card-img-overlay">
        <div>
          <h5>Thank you for donating!</h5>
          <p>
            Have a lasting impact. Your donation helps the SF Marin Food Bank to
            provide and distribute food to homeless people.
          </p>
          <p>
            Your $20 donation can help us buy 80 pounds of nutrient-packed
            produce, like fresh broccoli. 80 pounds of rice or dried beans: One
            of the most economic ways we can stretch $20 is by buying bulk dried
            beans and grains and then bagging them up into smaller portions.
          </p>
        </div>
        <StripeCheckout
          stripeKey={stripeKey}
          token={handleToken}
          billingAddress
          amount={donation.amount * 100}
          name={donation.name}
        >
          <Button className="donate btn btn-success">Donate</Button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default Donate;
