const {db} = require('./sql')
const stripe = require('stripe')(process.env.STRIPE_SECRET)


function test() {
    return new Promise((resolve, reject) => {
        db.ping(function(err) {
            if (err) throw err;
            err ? reject(err) : resolve('successfully connected to database')
        })
    })
}

function findUserByGoogleID(id) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT * FROM users WHERE googleID = ?;',
            values: [id]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
        
}

function createUserFromGoogleProfile(profile) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'INSERT INTO users (googleID, firstName, lastName, pictureURL) VALUES (?,?,?,?)',
            values: [profile.id, profile.name.givenName, profile.name.familyName, profile.photos[0].value]
        }, function(err, row) {
            err ? reject(err) : db.query({
                sql: 'SELECT * FROM users WHERE userID = ?',
                values: [row.insertId]
            }, function(err, row) {
                err ? reject(err) : resolve(row)
            })
        })
    })
}

function checkForStripeCustomer(user) {
    return new Promise((resolve, reject) => {
        if (user && user.stripeID == null || user && user.stripeID == '') {
            createStripeCustomer(user.email)
            .then(customer => {
                //console.log(customer)
                db.query({
                    sql: 'UPDATE users SET stripeID = ? WHERE userID = ?;',
                    values: [customer.id, user.userID]
                }, function(err, row) {
                    if (err) {console.log(err); reject(err)}
                    else {
                        db.query({
                            sql: 'SELECT * FROM users WHERE userID = ?',
                            values: [user.userID]
                        }, function(err, row) {
                            if (err) {console.log(err); reject(err)}
                            else {resolve(row)}
                        })
                    }
                })
            })
        } else {
            resolve(user)
        }
    })
}

function createStripeCustomer(email) {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            email: email
        }).then(customer => {
            resolve(customer)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })
}

module.exports = {test, findUserByGoogleID, createUserFromGoogleProfile, checkForStripeCustomer}