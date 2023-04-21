const mongoose = require('mongoose');
const Post = require("../model/post")
console.info(Post)

mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log(err)
})

const post3 = new Post({
    caption: "High Quality",
    likes: 33,
    comments: "cool brooooooooooooooother",
    image: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
})
post3.save()
console.log(post3)
//*********DELETES EVERTHINGGGGGGGGG */


