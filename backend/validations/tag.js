import { body } from 'express-validator';

export const createTagValidation = [
	body('name').custom((tags) => {
		if (Array.isArray(tags)) {
			if (!tags.every((tag) => typeof tag === 'string')) {
				return true;
			} else {
				throw new Error('Tags is required');
			}
		} else {
			throw new Error('Tags is required');
		}
	}),
];
