import mongoose from 'mongoose';
import axios from 'axios';
const connectToMongoDB = () => {
	mongoose
		.connect(process.env.MONGO_DB_URI)
		.then(() => {
			console.log('Success connection to DB!');
			axios.post('http://localhost:4444/tag/tag');
		})
		.catch((error) => console.log('Failure connection to DB!', error));
};

export default connectToMongoDB;
