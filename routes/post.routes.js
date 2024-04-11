import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { createPostValidation } from '../validations/post.js';
import tokenCheck from '../utils/tokenCheck.js';

const router = express.Router();

router.post('/post', tokenCheck, createPostValidation, createPost);
// router.delete('/post', deletePost);
// router.get('/post/:id', getPost);
// router.get('/post', getAllPosts);
// router.patch('/post', updatePost);

export default router;
