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

const comments = [
    "Well done!",
    "Great job!",
    "Nice work!",
    "Impressive!",
    "Keep going!",
    "Good start!",
    "Perfect timing!",
    "You're amazing!",
    "Congrats on that!",
    "You're so talented!",
    "That's incredible!",
    "Fantastic effort!",
    "Awesome work, dude!",
    "Keep it up!",
    "You nailed it!",
    "Phenomenal work!",
    "Keep on truckin'!",
    "You're killing it!",
    "Remarkable job!",
    "I'm impressed, man!"
]
//console.log(comments[1])

const captions = [
"Explore with me?",
"Life is short, smile!",
"Wanderlust. Always seeking adventure.",
"Live, laugh, love, repeat.",
"Stay true to you.",
"Follow your heart, always.",
"Making memories, one day at a time.",
"Keep it simple, silly.",
"Seize the day!",
"Live in the moment.",
"Dare to dream big.",
"Always on the move.",
"Sunsets and smiles.",
"Love the little things.",
"Carpe diem, always.",
"Life's a journey, enjoy it.",
"Believe in yourself.",
"Find your happy place.",
"Keep the faith, always.",
"Embrace the journey."
]

function randomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

const seeders = []

 for (let i=0; i<20; i++) {
    // console.log(captions[i])
    seeders[i] = new Post({
        caption: captions[i],
        likes: randomNumber(),
        comments: comments[i]
    })
    seeders[i].save()
    console.log(seeders[i])
 }
