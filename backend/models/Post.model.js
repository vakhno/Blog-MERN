import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		text: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		image: {
			type: String,
			default: null,
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model('Post', PostSchema);
