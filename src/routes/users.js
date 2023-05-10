const express = require("express")
const router = express.Router()
const catchAsync = require("../utilities/catchAsync")


const User = require("../model/user")





router.get("/signup", (req, res) => {
    console.log("signup page request")
    res.render("users/signup")
})


router.post("/signup", catchAsync(async (req, res) => {
    // const post = new Post(req.body.post)
    // await post.save();
    // req.flash("success", "Successfully made a new post")
    // res.redirect(`posts/${post._id}`)
    res.send(req.body)
}))

module.exports = router;


