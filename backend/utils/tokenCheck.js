import jwt from 'jsonwebtoken';

const tokenCheck = (req, res, next) => {
	console.log('req.headers', req.headers);
	const token = req.headers['authorization-token'];
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.userId = decoded._id;
			next();
		} catch (error) {
			console.log('Failure me!');
			res.status(403).json({ error: 'No access' });
		}
	} else {
		console.log('Failure me!');
		res.status(403).json({ error: 'No access' });
	}
};

export default tokenCheck;
