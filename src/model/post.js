const mongoose = require("mongoose")
const Comment = require("./comment")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption: String,
    likes: Number,
    description: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

    

});

postSchema.post("findOneAndDelete", async function (deletedPost) {
    console.log(deletedPost)
    // const {comments} = deletedPost
    if(deletedPost) {
        await Comment.deleteMany({
            _id: {
                $in: deletedPost.comments
            }
        })
    }

})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
