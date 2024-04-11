import { body } from 'express-validator';

export const signUpValidation = [
	body('email', 'Incorrect email').isEmail(),
	body('password', 'Incorrect password').isLength({ min: 5 }),
	body('fullName', 'Incorrect full name').isLength({ min: 3 }),
	body('avatarUrl', 'Incorrect avatar url').optional().isURL(),
];

export const loginValidation = [
	body('email', 'Incorrect email').isEmail(),
	body('password', 'Incorrect password').isLength({ min: 5 }),
];
