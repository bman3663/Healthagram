const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');

const Post = require("./model/post")
console.info(Post)

 
mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")

})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log(err)
})
// ************************************ not the file connected to terminal// not updating
app.set("view engine", "ejs")


app.set("views", path.join(__dirname, "/views")) 

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
        res.render("home.ejs")
        // res.render("../../views/home.ejs")

})

app.get("/login", (req, res) => {
    console.log("login page request")
    res.send("login html page")
})

app.get("/signup", (req, res) => {
    console.log("signup page request")
    res.send("signup html page")
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

app.post("/posts", async (req, res) => {
    // res.send(req.body.post)
    const post = new Post(req.body.post)
    await post.save();
    res.redirect(`posts/${post._id}`)

})

app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render("posts/select", {post})
})




app.get("*", (req, res) => {
    res.send("last cased scenario")
})


app.listen(3000, () => {
    console.log("Serving on port 3000")
})
