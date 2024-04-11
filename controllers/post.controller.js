import PostModel from '../models/Post.model.js';

export const createPost = async (req, res) => {
	try {
		console.log('req', req.userId);
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body?.tags,
			image: req.body?.image,
			author: req.userId,
		});

		const post = await doc.save();
		res.status(200).json(post);
	} catch (error) {
		console.log('Failure create post');
		res.status(400).json({ error: error });
	}
};

export const deletePost = (req, res) => {};

export const getAllPosts = (req, res) => {};
