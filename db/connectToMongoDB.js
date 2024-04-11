import mongoose from 'mongoose';

const connectToMongoDB = () => {
	mongoose
		.connect(process.env.MONGO_DB_URI)
		.then(() => console.log('Success connection to DB!'))
		.catch((error) => console.log('Failure connection to DB!', error));
};

export default connectToMongoDB;
