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

const post1 = new Post({
    caption: "The Big Apple",
    likes: 33,
    comments: "cool bro"
})
post1.save()
console.log(post1)
//*********DELETES EVERTHINGGGGGGGGG */
