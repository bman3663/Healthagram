const express = require("express")
const router = express.Router()
const catchAsync = require("../utilities/catchAsync")
const { storeReturnTo } = require('../middleware');
const User = require("../model/user")
const passport = require("passport")
const users = require("../controllers/users")

router.route("/signup")
    .get(users.renderSignupForm)
    .post(catchAsync(users.create))

router.route("/login")
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login)

router.get("/logout", users.logout)

module.exports = router;