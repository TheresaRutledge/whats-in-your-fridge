const cors = require('cors');
const express = require('express');
const stripeSecretKey =
  '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';
const stripe = require('stripe')(stripeSecretKey);
const uuid = require('uuid/v4');

const app = express();

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
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     line1: token.card.address_line1,
        //     line2: token.card.address_line2,
        //     city: token.card.address_city,
        //     country: token.card.address_country,
        //     postal_code: token.card.address_zip,
        //   },
        // },
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

app.listen(8080);
