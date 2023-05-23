const express = require("express")
const router = express.Router({mergeParams: true})
const { validateComments, isLoggedIn, isCommentAuthor } = require("../middleware")

// const { commentJoiSchema } = require("../schemas")
// const ExpressError = require("../utilities/ExpressError")
const Post = require("../model/post")
const Comment = require("../model/comment");
const catchAsync = require("../utilities/catchAsync")


router.post("/", isLoggedIn, validateComments, catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    // console.log(post)
    post.comments.push(comment)
    await comment.save()
    await post.save()
    req.flash("success", "Successfully Commented!")
    console.log(comment)

    res.redirect(`/posts/${post._id}`)
}))

router.delete("/:commentId", isLoggedIn, isCommentAuthor, catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    const apost = await Post.findById("64540ea021489eb4e0f4e524") 
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Successfully deleted comment!")

    res.redirect(`/posts/${id}`);
}))

module.exports = router;