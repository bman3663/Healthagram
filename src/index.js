const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs")

// app.set("views", path.join(__dirname, "/views")) 

app.set("views", path.join(__dirname, "/views")) 

// ^^^^ above code sus!!!
console.log(__dirname)

console.log()


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


app.get("*", (req, res) => {
    res.send("last case scenario")
})


app.listen(3000, () => {
    console.log("Serving on port 3000")
})
