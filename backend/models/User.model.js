import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatarUrl: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('User', UserSchema);
