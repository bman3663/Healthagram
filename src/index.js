const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const session = require("express-session")
const flash = require("connect-flash")
// const {postJoiSchema, commentJoiSchema} = require("./schemas")
// const catchAsync = require("./utilities/catchAsync")
const ExpressError = require("./utilities/ExpressError")
const methodOverride = require("method-override")
const passport = require("passport")
const localStrategy = require("passport-local")
const User = require("./model/user")
// const Post = require("./model/post")
// const Comment = require("./model/comment");
// const { comments } = require("./seeds/seedResources");

const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comments")
const userRoutes = require("./routes/users")
 
mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")
 
})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log("not connected to database (ensure mongod is running in powershell)")
})
// ************************************ not the file connected to terminal// not updating
app.engine("ejs", ejsMate)
app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "/views")) 

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")))

const sessionConfig = {
    secret: "sketchysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.use("/", userRoutes)
app.use("/posts", postRoutes)
app.use("/posts/:id/comments", commentRoutes)


app.get("/", (req, res) => {
        res.render("home.ejs")
})


// app.get("/user/:username", (req, res) => {
//     res.send(`page of user ${req.params.username}`)
// })

// app.get("/search", (req, res) => {
//     res.send(`page the of user ${req.query.q}`)
// })

app.all("*", (req, res, next) => {
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
