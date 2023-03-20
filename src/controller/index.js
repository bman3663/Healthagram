const express = require("express");
const app = express();
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("../../views/home.ejs")
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
