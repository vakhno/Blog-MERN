import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { tagsReducer } from './slices/tags';

const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
		tags: tagsReducer,
	},
});

export default store;
