require("dotenv").config()
const express = require('express')
const webpack = require('webpack')
const config = require("../webpack.config.js")
const middleware = require('webpack-dev-middleware')
const compiler = webpack(config)
const path = require('path')
const rootPath = path.resolve(__dirname, '..');
const GoogleStrategy = require('passport-google-oauth20')
const passport = require('passport')
const {test, findUserByGoogleID, createUserFromGoogleProfile, checkForStripeCustomer} = require('./authFunctions')
const session = require('express-session')
const loginRouter = require("./loginRouter.js")
const apiRouter = require("./api/api.js")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/google/callback"
}, function(accessToken, refreshToken, profile, cb) {
    findUserByGoogleID(profile.id)
    .then(row => {
        if(row && row[0]) {
            checkForStripeCustomer(row[0])
            .then(user => {
                return cb(null, user)
            })
            .catch(err => {
                console.log(err)
                return cb(err, null)
            })
        } else {
            createUserFromGoogleProfile(profile)
            .then(newUser => {
                return cb(null, newUser[0])
            })
        }
    })
    .catch(err => {
        return cb(err, null)
    })
}))
 
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json({}))

app.use(
    session({secret: 'test', saveUninitialized: false, resave: false})
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

if (process.env.ENVIRONMENT === 'dev') {
    console.log('Compiling in Development Environment')
    app.use(middleware(compiler, {
        publicPath: '/'
    }))
    app.use(require("webpack-hot-middleware")(compiler))
} else {
    console.log('Running in Production Mode')
}

app.use('/login', loginRouter)

app.get('/', (req, res) => {
    res.sendFile(rootPath + '/src/index.html')
})

app.use('/api', apiRouter)

app.get('/internal', (req, res) => {
    if (req.user) {
      res.sendFile(rootPath + "/src/index.html");
    } else {
    req.session.redirectTo = req.url
      res.redirect("/login/google");
    }
})

app.get('/internal/*', (req, res) => {
    if (req.user) {
        res.sendFile(rootPath + "/src/index.html");
      } else {
          //console.log(req.url)
          //save the original request url so that we can redirect the user after auth
      req.session.redirectTo = req.url
        res.redirect("/login/google");
      }
})

app.get('/dbtest', (req, res) => {
    test()
    .then(success => {
        console.log(success)
        res.send(success)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get("/main.bundle.js", (req, res) => {
    console.log('returning bundle')
    res.sendFile(rootPath + "/src/main.bundle.js");
  });

app.get('/hdqa', (req, res) => {
    res.sendFile(rootPath + '/src/index.html')
})

app.get('/data', (req, res) => {
    res.sendFile(rootPath + '/src/index.html')
})

app.get('/public/:path', (req, res) => {
    res.sendFile(rootPath + '/public/' + req.params.path)
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Running on port 3000')
})