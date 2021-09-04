const express = require('express')
const bodyParser = require('body-parser')
const stripeSecret = process.env.STRIPE_SECRET
const stripe = require('stripe')(stripeSecret)

const webhookRouter = express.Router()

webhookRouter.post('/webhook',
bodyParser.raw({ type: 'application/json' }),
async (req, res) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(
      `⚠️  Check the env file and enter the correct webhook secret.`
    );
    return res.sendStatus(400);
  }
  // Extract the object from the event.
  const dataObject = event.data.object;
  console.log('webhook processing')

  // Handle the event
  // Review important events for Billing webhooks
  // https://stripe.com/docs/billing/webhooks
  // Remove comment to see the various objects sent for this sample
  switch (event.type) {
    case 'customer.subscription.created':
      console.log(dataObject)
      break;
    case 'customer.subscription.updated':
        console.log(dataObject)
      break;
    case 'customer.subscription.deleted':
      if (event.request != null) {
        console.log(dataObject)
      } else {
        // handle subscription cancelled automatically based
        // upon your subscription settings.
      }
      break;
    default:
    // Unexpected event type
  }
  res.sendStatus(200);
})

module.exports = webhookRouter