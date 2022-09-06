import express from "express";
import { getPosts, createPosts, updatePosts } from "../contorllers/posts.js";

const router = express.Router();

router.get('/', getPosts)
router.post('/', createPosts)
router.patch('/:id', updatePosts)

export default router