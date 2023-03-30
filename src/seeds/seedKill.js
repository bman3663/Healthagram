const mongoose = require('mongoose');
const Post = require('../model/post'); // replace with your collection name

mongoose.connect('mongodb://localhost:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    return Post.deleteMany({});
  })
  .then(() => {
    console.log('All documents deleted');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error deleting documents', error);
    mongoose.connection.close();
  });