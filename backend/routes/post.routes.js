import express from 'express';
import multer from 'multer';
import {
	createPost,
	getAllPosts,
	getOnePost,
	deletePost,
	updatePost,
	addComment,
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
router.post('/postcomment', tokenCheck, addComment);
router.delete('/post/:id', tokenCheck, deletePost);
router.patch('/post/:id', tokenCheck, updatePostValidation, updatePost);
router.get('/post/:id', getOnePost);
router.get('/post', getAllPosts);

router.post('/upload', upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

// router.delete('/upload/:imageName', (req, res) => {
// 	// Get the image name from the request parameters
// 	const imageName = req.params.imageName;

// 	// Construct the path to the image file
// 	const imagePath = path.join(__dirname, '..', 'uploads', imageName);

// 	// Check if the file exists
// 	fs.access(imagePath, fs.constants.F_OK, (err) => {
// 		if (err) {
// 			// If the file does not exist, return a 404 response
// 			return res.status(404).json({ error: 'Image not found' });
// 		}

// 		// Delete the image file
// 		fs.unlink(imagePath, (err) => {
// 			if (err) {
// 				// If an error occurs while deleting the file, return a 500 response
// 				console.error('Error deleting image:', err);
// 				return res.status(500).json({ error: 'Failed to delete image' });
// 			}

// 			// If the image is successfully deleted, return a success response
// 			res.json({ message: 'Image deleted successfully' });
// 		});
// 	});
// });

// router.patch('/post', updatePost);

export default router;
