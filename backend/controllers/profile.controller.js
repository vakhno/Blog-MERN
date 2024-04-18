import UserModel from '../models/User.model.js';

export const me = async (req, res) => {
	try {
		console.log(res);
		const user = await UserModel.findById(req.userId);
		console.log('user', user);
		if (!user) {
			console.log('Failure me!');
			return res.status(404).json({ message: 'Failure me!' });
		} else {
			const { password, ...userData } = user._doc;
			console.log('Success me!');
			return res.status(200).json({ success: true, data: userData });
		}
	} catch (error) {
		console.log('Failure me!');
		return res.status(500).json({ error: error });
	}
};
