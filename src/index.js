const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const {postJoiSchema, commentJoiSchema} = require("./schemas")
const catchAsync = require("./utilities/catchAsync")
const ExpressError = require("./utilities/ExpressError")
const methodOverride = require("method-override")
const Post = require("./model/post")
const Comment = require("./model/comment")
console.info(Post)

 
mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")

})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log("not connected to database (ensure mongod is running in powershell)")

    // console.log(err)
})
// ************************************ not the file connected to terminal// not updating
app.engine("ejs", ejsMate)
app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "/views")) 

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

// Server-Side JOI validation middleware
const validatePost = (req, res, next) => {
    const {error} = postJoiSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
} 


const validateComments = (req, res, next) => {
    const {error} = commentJoiSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
} 



app.get("/", (req, res) => {
        res.render("home.ejs")
        // res.render("../../views/home.ejs")

})

app.get("/login", (req, res) => {
    console.log("login page request")
    res.render("login")
})

app.get("/signup", (req, res) => {
    console.log("signup page request")
    res.render("signup")
})

app.get("/user/:username", (req, res) => {
    res.send(`page of user ${req.params.username}`)
})

app.get("/search", (req, res) => {
    res.send(`page the of user ${req.query.q}`)
})


app.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    res.render("posts/gallery", { posts } )
})

app.get("/posts/create", (req, res) => {
    res.render("posts/create")
})

app.post("/posts", validatePost, catchAsync(async (req, res) => {
    
    const post = new Post(req.body.post)
    await post.save();
    res.redirect(`posts/${post._id}`)
}))

app.get("/posts/:id", catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    // experiment
        // const comments = await Comment.findById(post)

    // experiment
    res.render("posts/select", {post})
}))

app.get("/posts/:id/edit", catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render("posts/edit", {post})
}))

app.put("/posts/:id", validatePost, catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { ...req.body.post});
    res.redirect(`/posts/${post._id}`) 
}))


app.delete("/posts/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
    res.redirect(`/posts`) 
}))


app.post("/posts/:id/comment", validateComments, catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    post.comments.push(comment)
    await comment.save()
    await post.save()
    res.redirect(`/posts/${post._id}`)
}))

app.all("*", (req, res, next) => {
    // res.send("404")
    next(new ExpressError("Page Not Found!", 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = "Something went wrong [default]"
    res.status(statusCode).render("error", { err })
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})
