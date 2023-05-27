const Post = require("../model/post")


module.exports.index = async (req, res) => {
    const posts = await Post.find({});
    res.render("posts/gallery", { posts } )
}

module.exports.renderCreateForm = (req, res) => {
    res.render("posts/create")
}

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body.post)
    post.author = req.user._id
    await post.save();
    req.flash("success", "Successfully made a new post")
    res.redirect(`posts/${post._id}`)
}
module.exports.renderPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate({
    path: "comments",
    populate: {
        path: "author"
    }}).populate("author")
    // console.log(post)
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }
    res.render("posts/select", {post})
}

module.exports.renderEditForm = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
    req.flash("error", "Cannot find that post")
    return res.redirect("/posts")
    }
    res.render("posts/edit", {post})
}

module.exports.updatePost = async (req, res) => {
    const { id } = req.params;    
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post});

    req.flash("success", "Successfully updated post")
    res.redirect(`/posts/${post._id}`) 
}
module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
    req.flash("success", "Successfully deleted post")
    res.redirect(`/posts`) 
}
// module.exports.
// module.exports.
// module.exports.