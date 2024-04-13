import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

export default mongoose.model('Tag', TagSchema);
