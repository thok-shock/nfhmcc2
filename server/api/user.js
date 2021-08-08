const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    if (req.query.type === 'self') {
        res.send( req.session)
    }
})

module.exports = userRouter