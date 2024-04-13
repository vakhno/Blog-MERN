import express from 'express';
import multer from 'multer';
import {
	createPost,
	getAllPosts,
	getOnePost,
	deletePost,
	updatePost,
} from '../controllers/post.controller.js';
import { createPostValidation, updatePostValidation } from '../validations/post.js';
import tokenCheck from '../utils/tokenCheck.js';
const router = express.Router();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

router.post('/post', tokenCheck, createPostValidation, createPost);
router.delete('/post/:id', tokenCheck, deletePost);
router.patch('/post/:id', tokenCheck, updatePostValidation, updatePost);
router.get('/post/:id', getOnePost);
router.get('/post', getAllPosts);

router.post('/upload', upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

// router.patch('/post', updatePost);

export default router;
