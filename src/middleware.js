
const { postJoiSchema } = require("./schemas")
const ExpressError = require("./utilities/ExpressError")
const Post = require("./model/post")
const Comment = require("./model/comment")
const User = require("./model/user")
const { commentJoiSchema } = require("./schemas")




const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


const isLoggedIn = (req, res, next) => {
// console.log(req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in to complete this action")
        return res.redirect("/login")
    }
    next()
}   



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

const isAuthor = (async(req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    console.log(req.user._id)
    console.log(post.author._id)
    if (!post.author.equals(req.user._id)) {
        console.log(post.author.equals(req.user))
        req.flash("error", "This is not your post to edit")
        return res.redirect(`/posts/${post._id}`) 
    }
    next()
})


const isCommentAuthor = (async(req, res, next) => {
    const { id, commentId } = req.params;
    console.log(commentId)
    const comment = await Comment.findById(commentId);
    // console.log(req.user._id)
    // console.log(post.author._id)
    console.log(comment)
    if (!comment.author.equals(req.user._id)) {
        // console.log(post.author.equals(req.user))
        req.flash("error", "This is not your comment to edit")
        return res.redirect(`/posts/${id}`) 
    }
    next();
})


const validateComments = (req, res, next) => {
    const {error} = commentJoiSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
        // res.send(error)
    }
    else {
        next();
    }
} 


//adding current user to res local
const getCurrentUser = async (req, res, next) => {
//   if (req.session.userId) {
//     try {
//       const user = await User.findById(req.session.userId);
//       res.locals.currentUser = user; // Add user to response locals
//     } catch (err) {
//       console.log('Error retrieving user:', err);
//     }
//   }
//   next();
};


module.exports = {storeReturnTo, validatePost, isLoggedIn, isAuthor, isCommentAuthor, validateComments, getCurrentUser}