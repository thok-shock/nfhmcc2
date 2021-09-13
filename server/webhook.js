const express = require('express')
const bodyParser = require('body-parser')
const stripeSecret = process.env.STRIPE_SECRET
const stripe = require('stripe')(stripeSecret)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const webhookRouter = express.Router()

webhookRouter.post('/', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log('✅ Success:', event.id);

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});

module.exports = webhookRouter