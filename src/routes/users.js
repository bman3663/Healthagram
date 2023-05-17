const express = require("express")
const router = express.Router()
const catchAsync = require("../utilities/catchAsync")

const { storeReturnTo } = require('../middleware');

const User = require("../model/user")
const passport = require("passport")





router.get("/signup", (req, res) => {
    res.render("users/signup")
})


router.post("/signup", catchAsync(async (req, res) => {
    try {
        const {username, email, password} = req.body
        const user = new User({username, email})
        const regUser = await User.register(user, password)
        // console.log(regUser)
        req.login(regUser, err => {
            if(err) return next(err);
                req.flash("success", "Account Created, Welcome to Healthagram")
                res.redirect("posts")
        })
       
    }
    catch(e) {
        req.flash("error", e.message)
        res.redirect("signup")

    }
}))


router.get("/login", (req, res) => {
    res.render("users/login")
})
router.post("/login",storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash("success", "Welcome Home!")
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl)
})


router.get("/logout", (req, res) => {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are now logged out")
        res.redirect("posts")
    });


})


 

module.exports = router;


