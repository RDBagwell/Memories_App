import express from "express";
import { getPosts, createPosts, updatePosts, deletePosts, likePosts } from "../contorllers/posts.js";

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePosts);
router.delete('/:id', auth, deletePosts);
router.patch('/:id/likePost', auth, likePosts)

export default router