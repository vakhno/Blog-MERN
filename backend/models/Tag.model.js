import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	popularity: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('Tag', TagSchema);
