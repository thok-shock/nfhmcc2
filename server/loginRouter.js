const express = require("express");
const passport = require("passport");

const loginRouter = express.Router();

loginRouter.use((req, res, next) => {
  next();
});

const googleLoginRouter = express.Router()

loginRouter.use('/google', googleLoginRouter)

googleLoginRouter.get(
    "/",
    passport.authenticate("google", { failureRedirect: "/", failureFlash: true, scope: ['profile'] }),
    function (req, res) {
      res.redirect("/");
    }
  );
  

googleLoginRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/", failureFlash: true }),
  function (req, res) { 
    res.redirect(req.session.redirectTo);
    req.session.redirectTo = null
  }
);

module.exports = loginRouter;