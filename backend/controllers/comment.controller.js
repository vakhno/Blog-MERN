import CommentModel from '../models/Comment.model.js';

export const getComments = async (req, res) => {
	try {
		const commentsIds = req.body.ids;
		const comments = await CommentModel.find({ _id: { $in: commentsIds } }).populate('author');
		return res.status(200).json({ data: comments });
	} catch (error) {
		res.status(400).jsons({ error });
	}
};

export const postComment = async (req, res) => {
	try {
		const doc = new CommentModel({
			text: req.body.text,
			author: req.body.author,
			post: req.body.post,
		});
		const comment = await doc.save();
		return res.status(200).json(comment);
	} catch (error) {
		res.status(400);
	}
};
