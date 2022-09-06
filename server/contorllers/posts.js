import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res)=>{
    try {
        // const PostMessage = await PostMessage.find();
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPosts = async (req, res)=>{
    const posts = req.body;
    const newPost = new PostMessage(posts)
    try {
       await newPost.save()
       res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePosts = async (req, res)=>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');
    const posts = req.body;
    const updatePosts = await PostMessage.findById(_id, posts, {new: true});
    res.json(updatePosts)
}