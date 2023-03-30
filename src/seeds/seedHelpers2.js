const mongoose = require('mongoose');
const Post = require("../model/post")
const { comments, captions } = require("./seedResources")

mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log(err)
})

function randomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}


const swiper = async () => {
 
const post1 = new Post({
    caption: captions[2],
    likes: randomNumber(),
    comments: comments[3]
    
    })
 }

 swiper().then(() => {
    mongoose.connection.close();
    console.log("done")
 })




post1.save()
console.log(post1)
//*********DELETES EVERTHINGGGGGGGGG */

