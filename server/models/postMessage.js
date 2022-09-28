import mongoose from "mongoose";

const posrtScema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: String,
        default: new Date()
    }

})

const PostMessage = mongoose.model('PostMessage', posrtScema);

export default PostMessage;