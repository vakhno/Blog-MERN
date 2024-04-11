import { body } from 'express-validator';

export const createPostValidation = [
	body('title', 'Title is required').isLength({ min: 5 }).isString(),
	body('text', 'Text is required').isLength({ min: 10 }).isString(),
	body('tags', 'Invalid format').optional().isString(),
	body('image', 'Invalid format').optional().isString(),
];
