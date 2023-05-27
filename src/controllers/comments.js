
const Post = require("../model/post")
const Comment = require("../model/comment");

module.exports.create = async (req, res) => {
    const post = await Post.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    post.comments.push(comment)
    await comment.save()
    await post.save()
    req.flash("success", "Successfully Commented!")
    // console.log(comment)

    res.redirect(`/posts/${post._id}`)
}

module.exports.delete = async (req, res) => {
    const { id, commentId } = req.params;
    const apost = await Post.findById("64540ea021489eb4e0f4e524") 
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Successfully deleted comment!")

    res.redirect(`/posts/${id}`);
}