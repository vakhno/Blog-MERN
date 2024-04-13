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
		tags: {
			type: Array,
			default: [],
		},
		image: {
			type: String,
			default: '',
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Post', PostSchema);
