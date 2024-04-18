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

export const deletePost = (req, res) => {
	try {
		const postId = req.params.id;
		PostModel.findOneAndDelete({ _id: postId })
			.then((doc) => {
				console.log(doc);
				if (doc) {
					res.status(200).json({ success: true });
				} else {
					console.log('No such post to delete');
					res.status(400).json({ message: 'No such post to delete' });
				}
			})
			.catch((err) => {
				console.log('Failure delete post');
				res.status(500).json({ error: err });
			});
	} catch (error) {
		console.log('Failure delete post');
		res.status(500).json({ error: error });
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const allPosts = await PostModel.find().populate('author');
		res.status(200).json(allPosts);
	} catch (error) {
		console.log('Failure get all posts');
		res.status(400).json({ error: error });
	}
};

export const getOnePost = (req, res) => {
	const postId = req.params.id;
	PostModel.findOneAndUpdate(
		{ _id: postId },
		{ $inc: { viewsCount: 1 } },
		{ returnDocument: 'after' },
	)
		.populate('author')
		.then((doc) => {
			if (!doc) {
				console.log('Failure get post');
				res.status(404).json({ message: 'No such post' });
			} else {
				res.status(200).json(doc);
			}
		})
		.catch((err) => {
			console.log('Failure get post');
			res.status(500).json({ error: err });
		});
};

export const updatePost = async (req, res) => {
	try {
		const postId = req.params.id;
		console.log('postId', postId);
		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				tags: req.body?.tags,
				image: req.body?.image,
			},
		);

		res.status(200).json({ success: true });
	} catch (error) {
		console.log('Failure update');
		res.status(500).json({ error: error });
	}
};
