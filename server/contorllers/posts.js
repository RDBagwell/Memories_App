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
    const newPost = new PostMessage({ ...posts, creator: req.userId, createdAt: new Date().toISOString() })
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
    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...posts, _id}, {new: true});
    res.json(updatePost)
}

export const likePosts = async (req, res)=>{
    const {id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unauthenticated."});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');
    
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id)=> id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    // const likedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true});
    const likedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    
    
    res.json(likedPost)
}

export const deletePosts = async (req, res)=>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');
    await PostMessage.findByIdAndDelete(_id);
    res.json({message: 'Post deleted successfully'});
}