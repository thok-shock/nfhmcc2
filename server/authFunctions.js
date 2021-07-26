const {db} = require('./sql')

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
            sql: 'SELECT FROM users WHERE googleID = ?',
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
                sql: 'SELECT * FROM users WHERE user.userID = ?',
                values: [row.insertId]
            }, function(err, row) {
                err ? reject(err) : resolve(row)
            })
        })
    })
}

module.exports = {test, findUserByGoogleID, createUserFromGoogleProfile}