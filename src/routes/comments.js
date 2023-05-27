const express = require("express")
const router = express.Router({mergeParams: true})
const { validateComments, isLoggedIn, isCommentAuthor } = require("../middleware")

const comments = require("../controllers/comments")

const Post = require("../model/post")
const Comment = require("../model/comment");
const catchAsync = require("../utilities/catchAsync")


router.post("/", isLoggedIn, validateComments, catchAsync(comments.create))

router.delete("/:commentId", isLoggedIn, isCommentAuthor, catchAsync(comments.delete))

module.exports = router;