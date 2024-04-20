import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/post/post');
	return { data };
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (params) => {
	const { id } = params;
	const { data } = await axios.get(`/post/post/${id}`);
	return { data };
});

export const deletePost = createAsyncThunk('posts/deletePost', async (params) => {
	const { id } = params;
	await axios.delete(`/post/post/${id}`);
	return { id };
});

// export const addComment = createAsyncThunk('posts/fetchPosts', async (params) => {
// 	const { id, newComment } = params;
// 	const { data } = await axios.post('post/post/comment', { id, newComment });
// 	return { data };
// });

export const editPost = createAsyncThunk('posts/editPost', async (params) => {
	const { id, fields, imageFile } = params;
	let url = null;
	if (imageFile) {
		const { data } = await axios.post('/post/upload', imageFile);
		url = data.url;
	}
	if (url) {
		fields['image'] = url;
	} else {
		fields['image'] = null;
	}
	await axios.patch(`/post/post/${id}`, fields);
	return { id, fields };
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

export const removePost = createAsyncThunk('/posts/removePost', () => {
	return;
});

const initialState = {
	posts: {
		items: [],
		status: 'loaded',
	},
	currentPost: {
		data: null,
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
			const { data } = action.payload;
			state.posts.items = data;
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
			state.posts.items = [newPost, ...state.posts.items];
		},
		[addPost.rejected]: () => {},
		[editPost.pending]: () => {},
		[editPost.fulfilled]: (state, action) => {
			const { id, fields } = action.payload;
			const editablePost = state.posts.items.find((post) => post._id === id);
			Object.assign(editablePost, fields);
		},
		[editPost.rejected]: () => {},
		[fetchPost.pending]: (state) => {
			state.currentPost.status = 'loading';
		},
		[fetchPost.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.currentPost.data = data;
			state.currentPost.status = 'loaded';
		},
		[fetchPost.rejected]: (state) => {
			state.currentPost.status = 'error';
		},
		[removePost.fulfilled]: (state) => {
			state.currentPost.data = null;
			state.currentPost.status = 'loaded';
		},
	},
});

export const postsReducer = postsSlice.reducer;
// export const { removePost } = postsSlice.actions;
