const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption: String,
    likes: Number,
    description: String,
    image: String,
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]

    

});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
