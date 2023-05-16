const express = require("express")
const router = express.Router()
const catchAsync = require("../utilities/catchAsync")


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
        req.flash("success", "Account Created, Welcome to Healthagram")
        res.redirect("posts")
    }
    catch(e) {
        req.flash("error", e.message)
        res.redirect("signup")

    }
}))


router.get("/login", (req, res) => {
    res.render("users/login")
})
// , successFlash: true, successRedirect: "/posts"
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    console.log("listo")
    req.flash("success", "Welcome Home!")
    res.redirect("posts")

})




module.exports = router;


