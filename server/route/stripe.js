const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection');

const app = express();

const stripeSecretKey =
  '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';
const stripe = require('stripe')(stripeSecretKey);
const uuid = require('uuid/v4');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post('/StripeDonate', async (req, res) => {
  console.log('Request:', req.body);

  let error;
  let status;
  try {
    const { donation, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: donation.amount * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Donation to ${donation.name}`,
      },
      {
        idempotency_key,
      },
    );
    console.log('Charge:', { charge });
    status = 'success';
  } catch (error) {
    console.error('Error:', error);
    status = 'failure';
  }

  res.json({ error, status });
});

app.listen(8080, () => {
  console.log(`Stripe API server running on port 8080`);
});
