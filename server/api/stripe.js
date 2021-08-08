const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const {db} = require('../sql')

const stripeRouter = express.Router()

function createSubscription(customerID, priceID) {
    return new Promise((resolve, reject) => {
        stripe.subscriptions.create({
            customer: customerID,
            items: [{
                price: priceID
            }],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent']
        })
        .then(subscription => {
            resolve(subscription)
        })
        .catch(err => {
            console.log(err)
        })
    }) 
}

function storeSubscriptionID(customerID, subscriptionID) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'UPDATE users SET subscriptionID = ? WHERE stripeID = ?;',
            values: [subscriptionID, customerID]
        }, function(err, row) {
            if (err) reject(err);
            if (!err) resolve(row)
        })
    })
}

stripeRouter.post('/create-subscription', (req, res) => {
    const customerID = req.body.customerID;
    const priceID = req.body.priceID;
    createSubscription(customerID, priceID)
    .then(subscription => {
        storeSubscriptionID(customerID, subscription.id)
        .then(row => {
            res.json({
                subscriptionID: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret
            })
        }) 
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({'error': err.message})
    })
})

module.exports = stripeRouter