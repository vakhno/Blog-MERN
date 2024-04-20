import express from 'express';
import { getComments, postComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/getcomment', getComments);
router.post('/comment', postComment);

export default router;
