const express = require("express")
const router = express.Router()

const catchAsync = require("../utilities/catchAsync")
// const { postJoiSchema } = require("../schemas")
const { isLoggedIn, isAuthor, validatePost } = require("../middleware")

// const ExpressError = require("../utilities/ExpressError")
const Post = require("../model/post")



router.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.render("posts/gallery", { posts } )
})

router.get("/create", isLoggedIn, (req, res) => {
    res.render("posts/create")
})

router.post("/", validatePost, isLoggedIn, catchAsync(async (req, res) => {
    const post = new Post(req.body.post)
    // console.log(req.user._id)
    post.author = req.user._id
    // console.log(post)
    await post.save();
    req.flash("success", "Successfully made a new post")
    res.redirect(`posts/${post._id}`)
}))

router.get("/:id", catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate({
    path: "comments",
    populate: {
        path: "author"
    }}).populate("author")
    console.log(post)
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }
    res.render("posts/select", {post})
}))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }
    res.render("posts/edit", {post})
}))

router.put("/:id", validatePost, isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;    
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post});

    req.flash("success", "Successfully updated post")
    res.redirect(`/posts/${post._id}`) 
}))

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
    req.flash("success", "Successfully deleted post")
    res.redirect(`/posts`) 
}))



module.exports = router;

