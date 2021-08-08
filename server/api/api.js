const express = require('express')
const stripeRouter = require('./stripe')
const userRouter = require('./user')

const apiRouter = express.Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/stripe', stripeRouter)

module.exports = apiRouter