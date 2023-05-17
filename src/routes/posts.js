const express = require("express")
const router = express.Router()

const catchAsync = require("../utilities/catchAsync")
const { postJoiSchema } = require("../schemas")
const { isLoggedIn } = require("../middleware")

const ExpressError = require("../utilities/ExpressError")
const Post = require("../model/post")



// Server-Side JOI validation middleware
const validatePost = (req, res, next) => {
    const {error} = postJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        // console.log(post.description)
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
} 


router.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.render("posts/gallery", { posts } )
})

router.get("/create", isLoggedIn, (req, res) => {
    res.render("posts/create")
})

router.post("/", validatePost, isLoggedIn, catchAsync(async (req, res) => {
    const post = new Post(req.body.post)
    await post.save();
    req.flash("success", "Successfully made a new post")
    res.redirect(`posts/${post._id}`)
}))

router.get("/:id", catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate("comments")
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }

    res.render("posts/select", {post})
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }
    res.render("posts/edit", {post})
}))

router.put("/:id", validatePost, catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post});
    req.flash("success", "Successfully updated post")

    res.redirect(`/posts/${post._id}`) 
}))

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
    req.flash("success", "Successfully deleted post")
    res.redirect(`/posts`) 
}))


module.exports = router;

