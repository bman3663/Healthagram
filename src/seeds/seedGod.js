const mongoose = require('mongoose');
const Post = require("../model/post")



mongoose.connect('mongodb://127.0.0.1:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log(err)
})
let sigmaList = 
[
  {
    description: "A beautiful sunset over the ocean.",
    caption: "Life is a journey, enjoy the ride.",
    likes: 48,
    image: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    comments: ["Wow, stunning view!", "Love the colors!", "Amazing capture!", "Where was this taken?", "One of the best sunsets I've seen!"]
  },
  {
    description: "A delicious bowl of spaghetti and meatballs.",
    caption: "When in doubt, pasta it out.",
    likes: 31,
    image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8QSUyMGJvd2wlMjBvZiUyMHNwYWdoZXR0aSUyMGFuZCUyMG1lYXRiYWxsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["Yum, that looks amazing!", "I want some too!", "My favorite dish!", "How did you make it?", "I can almost taste it!"]
  },
  {
    description: "A cute puppy playing with a ball.",
    caption: "Pawsitively adorable!",
    likes: 17,
    image: "https://images.unsplash.com/photo-1521404328242-d27bf2cb0edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHVwcHklMjBwbGF5aW5nJTIwd2l0aCUyMGElMjBiYWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["What a cutie!", "So precious!", "I want to cuddle him!", "What's his name?", "I need a puppy like this!"]
  },
  {
    description: "A breathtaking view of a mountain range.",
    caption: "The mountains are calling and I must go.",
    likes: 44,
    image: "https://images.unsplash.com/photo-1530052667553-f56f1cdf6d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlldyUyMG9mJTIwYSUyMG1vdW50YWluJTIwcmFuZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["What an amazing view!", "I love the mountains!", "I wish I was there!", "What's the name of this place?", "Nature at its finest!"]
  },
  {
    description: "A colorful bouquet of flowers.",
    caption: "Stop and smell the roses.",
    likes: 21,
    image: "https://plus.unsplash.com/premium_photo-1670426501265-3cd3d4a30f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym91cXVldCUyMG9mJTIwZmxvd2Vycy58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["What a lovely bouquet!", "I love flowers!", "These are so pretty!", "What occasion are they for?", "I need some flowers in my life!"]
  },
  {
    description: "A stunning cityscape at night.",
    caption: "City lights and city nights.",
    likes: 47,
    image: "https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym91cXVldCUyMG9mJTIwZmxvd2Vycy58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["This is amazing!", "I love the city at night!", "What a great photo!", "Where was this taken?", "Can't wait to visit this city!"]
  },
  {
    description: "A cute cat sleeping on a cozy bed.",
    caption: "Life is better with cats.",
    likes: 9,
    image: "https://images.unsplash.com/photo-1612528906781-07ecd8446ec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    comments: ["So cute!", "I love cats!", "What's his name?", "I wish my cat would sleep like this!", "I want to pet him!"]
  },
  {
    description: "A refreshing glass of lemonade on a hot day.",
    caption: "When life gives you lemons, make lemonade.",
    likes: 28,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGdsYXNzJTIwb2YlMjBsZW1vbmFkZSUyMG9uJTIwYSUyMGhvdCUyMGRheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["Looks so refreshing!", "I want some too!", "Perfect drink for a hot day!", "How did you make it?", "I need this recipe!"]
  },
  {
    description: "A beautiful bride and groom on their wedding day.",
    caption: "Happily ever after starts here.",
    likes: 39,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    comments: ["What a beautiful couple!", "Congratulations!", "I wish you all the happiness in the world!", "When's the big day?", "Love is in the air!"]
  },
  {
    description: "A stunning view of a city skyline.",
    caption: "The city never looked so good.",
    likes: 20,
    image: "https://images.unsplash.com/photo-1534298261662-f8fdd25317db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0eSUyMHNreWxpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    //must finish off BELOW TEXT
    comments: ["What a view!", "I love the city!", "It's a parade inside my city yeah", "City vibez thooo!", "You're the king of your city"]
  },
  {
    description: "A cute baby smiling in a onesie.",
    caption: "Cutest little human.",
    likes: 12,
    image: "https://images.unsplash.com/photo-1608365151231-7dbed3034787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMHNtaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["What a sweet baby!", "So adorable!", "I love those cheeks!", "What's his name?", "I want to hold him!"]
  },
  {
    description: "A beautiful bouquet of roses.",
    caption: "Roses are red, violets are blue, I love flowers, how about you?",
    likes: 37,
    image: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["What a beautiful bouquet!", "I love flowers!", "These are so pretty!", "What occasion are they for?", "I need some flowers in my life!"]
  },
  {
    description: "A delicious stack of pancakes with syrup.",
    caption: "Wake up and smell the pancakes.",
    likes: 22,
    image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["I'm craving pancakes now!", "Yum, that looks delicious!", "Perfect breakfast!", "What's your secret to making perfect pancakes?", "I need some syrup!"]
  },
  {
    description: "A stunning view of a waterfall in a forest.",
    caption: "Nature is not a place to visit. It is home.",
    likes: 45,
    image: "https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXJmYWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["What a breathtaking view!", "I love waterfalls!", "This is paradise!", "Where was this taken?", "I want to visit this place!"]
  },
  {
    description: "A cute dog playing fetch at the park.",
    caption: "Dogs are not our whole life, but they make our lives whole.",
    likes: 29,
    image: "https://images.unsplash.com/photo-1628105122995-972f14d650f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nJTIwaW4lMjBwYXJrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["What a cute dog!", "I love dogs!", "He's so playful!", "What's his name?", "Can I play too?"]
  },
  {
    description: "A beautiful sunset over a lake.",
    caption: "Sunsets are proof that no matter what happens, every day can end beautifully.",
    likes: 50,
    image: "https://images.unsplash.com/photo-1582835098524-889d45f29460?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZSUyMHN1bnNldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    comments: ["This is stunning!", "One of the best sunsets I've seen!", "What a view!", "Where was this taken?", "I need to see this in person!"]
  },
  {
    description: "A refreshing iced coffee on a hot day.",
    caption: "Life is too short for bad coffee.",
    likes: 18,
    image: "https://images.unsplash.com/photo-1570470752323-008a24a061b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    comments: ["I need this right now!", "Perfect drink for a hot day!", "How did you make it?", "Can I have a sip?", "I need this recipe!"]
  },
  {
    description: "A beautiful horse in a field.",
    caption: "I can't think of anything more relaxing than being around horses.",
    likes: 11,
    image: "https://images.unsplash.com/photo-1553284965-fa61e9ad4795?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9yc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    comments: ["What a beautiful horse!", "I love horses!", "What's his name?", "Can I ride him?", "I want to learn how to ride!"]
  },
  {
    description: "A stunning view of a beach at sunrise.",
    caption: "Every sunrise is a new beginning.",
    likes: 42,
    image: "https://images.unsplash.com/photo-1563738068154-8d2e9f19ed62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBzdW5yaXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        //must finish off BELOW TEXT

    comments: ["What a view!", "I love the beach!", "This is paradise!", "Where was this taken?", "I need to see this in my area"]
  },
  {
    description: "A colorful hot air balloon festival",
    caption: "Up, up and away!",
    likes: 45,
    image: "https://images.unsplash.com/photo-1608682207726-499ae8443334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    comments: [
      "This looks like so much fun!",
      "I've always wanted to go to a hot air balloon festival!",
      "The colors are so vibrant, it's like a rainbow in the sky!",
      "The view must be amazing from up there!",
      "I love the sense of adventure and freedom in this photo!"
    ]
  }
]

console.log(typeof(sigmaList))

const swiper = async () => {

  // for (const prop of sigmaList) {
  //   // console.log(prop);
  //   const sigmaSeed = new Post(prop)
  //     await sigmaSeed.save()
  // }

  for (const prop of sigmaList) {
    // console.log(prop);
    const sigmaSeed = new Post({
       description: prop.description,
      caption: prop.caption,
      likes: prop.likes,
      image: prop.image,
      author: "6465d3d8cf5683de3db86dec"
    })
      await sigmaSeed.save()
  }



}



swiper().then(() => {
  mongoose.connection.close();
  console.log("done")
})



// console.log(sigmaList[1])

// // breakkkkkkkkkkkkkkkkkkkkkkk here

// const sniper = async () => {
// //  await  Post.deleteMany({})

// for (let i = 0; i < 5; i++) {
//   // Your code 
//   const seeder = new Post({
//         caption: captions[i],
//         likes: randomNumber(),
//         comments: comments[i]
//     }) 
//     await seeder.save()
// }    
//  }

//  swiper().then(() => {
//     mongoose.connection.close();
//     console.log("done")
//  })
