const express = require("express")
const router = express.Router()
const posts = require("../controllers/posts")
const catchAsync = require("../utilities/catchAsync")
const { isLoggedIn, isAuthor, validatePost } = require("../middleware")

const Post = require("../model/post")



router.route("/")
    .get(catchAsync(posts.index))
    .post(validatePost, isLoggedIn, catchAsync(posts.createPost))

router.get("/create", isLoggedIn, posts.renderCreateForm)

router.route("/:id")
    .get(catchAsync(posts.renderPost))
    .put(validatePost, isLoggedIn, isAuthor, catchAsync(posts.updatePost))
    .delete( isLoggedIn, isAuthor, catchAsync(posts.deletePost))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(posts.renderEditForm))



module.exports = router;

