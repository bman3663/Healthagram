const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption: String,
    likes: Number,
    comments: Array,
    description: String,
    image: String
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
