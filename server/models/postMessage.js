import mongoose from "mongoose";

const posrtScema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    }
    // likeCount: {
    //     type: Number,
    //     default: 0
    // },
    // createAt: {
    //     type: String,
    //     default: new Date()
    // }
})

const PostMessage = mongoose.model('PostMessage', posrtScema);

export default PostMessage;