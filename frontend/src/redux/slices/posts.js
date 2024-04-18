import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/post/post');
	return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (params) => {
	const { id } = params;
	await axios.delete(`/post/post/${id}`);
	return { id };
});

export const addPost = createAsyncThunk('/posts/addPost', async (params) => {
	const { fields, imageFile } = params;
	let url = null;
	if (imageFile) {
		const { data } = await axios.post('/post/upload', imageFile);
		url = data.url;
	}
	if (url) {
		fields['image'] = url;
	}
	const { data: newPost } = await axios.post('/post/post', fields);
	return { newPost };
});

const initialState = {
	posts: {
		items: [],
		status: 'loaded',
	},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducer: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.status = 'error';
			state.posts.items = [];
		},
		[deletePost.pending]: () => {},
		[deletePost.fulfilled]: (state, action) => {
			const { id } = action.payload;
			state.posts.items = state.posts.items.filter((post) => post._id !== id);
		},
		[deletePost.rejected]: () => {},
		[addPost.pending]: () => {},
		[addPost.fulfilled]: (state, action) => {
			const { newPost } = action.payload;
			state.posts.items = [...state.posts.items, newPost];
		},
		[addPost.rejected]: () => {},
	},
});

export const postsReducer = postsSlice.reducer;
