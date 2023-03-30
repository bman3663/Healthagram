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
//  await  Post.deleteMany({})

for (let i = 0; i < 5; i++) {
  // Your code 
  const seeder = new Post({
        caption: captions[i],
        likes: randomNumber(),
        comments: comments[i]
    }) 
    await seeder.save()
}    
 }

 swiper().then(() => {
    mongoose.connection.close();
    console.log("done")
 })
