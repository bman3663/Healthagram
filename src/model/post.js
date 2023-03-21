const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption: String,
    likes: Number,
    comments: Array,
    date: Date,
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
