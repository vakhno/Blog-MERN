import TagModel from '../models/Tag.model.js';
import { validationResult } from 'express-validator';
import DefaultTags from '../default/tags.default.js';

export const sendTags = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('Failure tags!');
			res.status(400).json({ success: false, error: errors.array() });
		} else {
			const tags = await TagModel.find();
			if (tags.length) {
				console.log('Default tags already exist');
			} else {
				const defaultTagObjects = DefaultTags.map((tagName) => ({ name: tagName }));
				await TagModel.insertMany(defaultTagObjects);
				res.status(200).json({ success: true });
			}
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

export const getAllTags = async (req, res) => {
	try {
		const tags = await TagModel.find();
		res.status(200).json({ tags: tags });
	} catch (error) {
		res.status(500).json({ message: 'Failure tags' });
	}
};

export const filterTagsByname = async (req, res) => {
	try {
		const { tagFilter } = req.params;
		const tags = await TagModel.find({ $reges: `${tagFilter}`, $options: 'i' });
		res.status(200).json({ filteredTags: tags });
	} catch (error) {
		res.status(500).json({ message: 'Failure tags filtering' });
	}
};
