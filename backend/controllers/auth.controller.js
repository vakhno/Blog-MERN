import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';

export const signup = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('Invalid validation!', errors);
			return res.status(400).json({ success: false, message: errors });
		} else {
			const userPassword = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(userPassword, salt);

			const newUser = new UserModel({
				email: req.body.email,
				fullName: req.body.fullName,
				avatarUrl: req.body.avatarUrl,
				password: passwordHash,
			});

			const user = await newUser.save();

			const token = jwt.sign(
				{
					_id: user._id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '15d',
				},
			);
			const { password, ...userData } = user._doc;

			console.log('Success signup!');
			return res
				.status(200)
				.json({ success: true, token: token, user: userData, message: 'Success signup!' });
		}
	} catch (error) {
		console.log('Server error!');
		console.log('Error: ', error);
		return res.status(500).json({ success: false, message: 'Server error!', error });
	}
};

export const login = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('Invalid validation!');
			return res.status(400).json({ success: false, message: 'Invalid validation!' });
		}

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			console.log('User is not found!');
			return res.status(400).json({ success: false, message: 'User is not found!' });
		} else {
			const isPasswordValid = await bcrypt.compare(req.body.password, user._doc.password);
			if (!isPasswordValid) {
				console.log('Incorrect data!');
				return res.status(404).json({ success: false, message: 'Incorrect data!' });
			} else {
				const token = jwt.sign(
					{
						_id: user._id,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: '15d',
					},
				);

				const { password, ...userData } = user._doc;
				console.log('Success login!');
				return res
					.status(200)
					.json({ success: true, token: token, user: userData, message: 'Success login!' });
			}
		}
	} catch (error) {
		console.log('Server error!');
		console.log('Error: ', error);
		return res.status(500).json({ success: false, message: 'Server error!', error });
	}
};

export const logout = (req, res) => {
	try {
		res.status(200).json({ success: true });
	} catch (error) {
		console.log('Server error!');
		console.log('Error: ', error);
		return res.status(500).json({ success: false, message: 'Server error!', error });
	}
};
