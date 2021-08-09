const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { db } = require("../sql");

const stripeRouter = express.Router();

function createSubscription(customerID, priceID) {
  return new Promise((resolve, reject) => {
    stripe.subscriptions
      .create({
        customer: customerID,
        items: [
          {
            price: priceID,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      })
      .then((subscription) => {
        resolve(subscription);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function getPIClientSecret(customerID) {
  return new Promise((resolve, reject) => {
    db.query(
      {
        sql: "SELECT paymentSecret FROM users WHERE stripeID = ?;",
        values: [customerID],
      },
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function storeSubscriptionID(customerID, subscriptionID) {
  return new Promise((resolve, reject) => {
    db.query(
      {
        sql: "UPDATE users SET subscriptionID = ? WHERE stripeID = ?;",
        values: [subscriptionID, customerID],
      },
      function (err, row) {
        if (err) reject(err);
        if (!err) resolve(row);
      }
    );
  });
}

function storePaymentSecret(secret, customerID) {
  return new Promise((resolve, reject) => {
    db.query(
      {
        sql: "UPDATE users SET paymentSecret = ? WHERE stripeID = ?;",
        values: [secret, customerID],
      },
      function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

stripeRouter.post("/create-subscription", (req, res) => {
  const customerID = req.body.customerID;
  const priceID = req.body.priceID;
  createSubscription(customerID, priceID)
    .then((subscription) => {
      storeSubscriptionID(customerID, subscription.id).then((row) => {
        storePaymentSecret(
          subscription.latest_invoice.payment_intent.client_secret,
          customerID
        ).then((row) => {
          req.session.passport.user.subscriptionID = subscription.id;
          req.session.passport.user.paymentSecret =
            subscription.latest_invoice.payment_intent.client_secret;
          res.json({
            subscriptionID: subscription.id,
            clientSecret:
              subscription.latest_invoice.payment_intent.client_secret,
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
});

stripeRouter.get("/get-latest-secret", (req, res) => {
  console.log(req.session.passport.user.subscriptionID);
  getPIClientSecret(req.session.passport.user.stripeID).then((sub) => {
    console.log(sub);
    res.json(sub);
  });
});

module.exports = stripeRouter;
