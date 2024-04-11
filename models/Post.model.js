import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
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
		type: String,
		default: '',
	},
	image: {
		type: String,
		default: '',
	},
	viewsCount: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model('Post', PostSchema);
