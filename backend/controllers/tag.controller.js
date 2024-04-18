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
				await TagModel.insertMany(DefaultTags);
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

export const getPopularTags = async (req, res) => {
	try {
		const popularTags = await TagModel.find({ popularity: { $gt: 0 } })
			.sort({ popularity: -1 })
			.limit(5);
		console.log('BACK', popularTags);
		res.status(200).json(popularTags);
	} catch (error) {
		res.status(500).json({ error: error });
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
