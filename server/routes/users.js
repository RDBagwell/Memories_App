import express from "express";
import { getUser, signup, signin } from "../contorllers/users.js";

const router = express.Router();

router.get('/', getUser);
router.post('/signin', signin );
router.post('/signin', signup );

export default router