import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Comment', CommentSchema);
