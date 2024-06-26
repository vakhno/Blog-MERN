import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

const PORT = process.env.PORT || 4444;

dotenv.config();

// this command will help read info from our request (req parametr)
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/post', postRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, (error) => {
	if (error) {
		return console.log(error);
	}
	connectToMongoDB();
});
