import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';

export const signup = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('Failure signup!');
			res.status(400).json({ success: false, error: errors.array() });
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
			res.status(200).json({ success: true, token: token, user: userData });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Failure signup!' });
	}
};

export const login = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('Failure login!');
			res.status(400).json({ success: false, error: errors.array() });
		}

		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			console.log('User is not found!');
			res.status(400).json({ message: 'Failure login!' });
		} else {
			const isPasswordValid = await bcrypt.compare(req.body.password, user._doc.password);
			if (!isPasswordValid) {
				console.log('Failure login!');
				res.status(404).json({ message: 'Failure login!' });
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
				res.status(200).json({ success: true, token: token, user: userData });
			}
		}
	} catch (error) {
		console.log('Failure login!');
		res.status(500).json({ message: 'Failure login!' });
	}
};
