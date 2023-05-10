const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({

    email: {
        // unique: true,
        type: String,
        required: true
    }

});

userSchema.plugin(passportLocalMongoose);

// postSchema.post("findOneAndDelete", async function (deletedPost) {
//     console.log(deletedPost)
//     // const {comments} = deletedPost
//     if(deletedPost) {
//         await Comment.deleteMany({
//             _id: {
//                 $in: deletedPost.comments
//             }
//         })
//     }

// })

module.exports =  mongoose.model("User", userSchema);

