import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const getCommentsByIds = createAsyncThunk('comments/getCommentsByIds', async (params) => {
	const { ids } = params;
	const { data } = await axios.post('/comment/getcomment', { ids });
	return { data };
});

export const addComment = createAsyncThunk('comments/addComment', async (params, { getState }) => {
	try {
		const state = getState();
		const author = state.auth.data;
		const { id, fields } = params;
		const { data } = await axios.post('/comment/comment', fields);
		await axios.post('/post/postcomment', { id, newComment: data._id });
		data['author'] = author;
		return data;
	} catch (error) {
		console.log('error', error);
	}
});

const initialState = {
	currentComments: {
		data: [],
	},
};

const CommentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		[getCommentsByIds.pending]: () => {},
		[getCommentsByIds.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.currentComments.data = data.data;
		},
		[getCommentsByIds.rejected]: () => {},
		[addComment.fulfilled]: (state, action) => {
			const data = action.payload;
			state.currentComments.data = [...state.currentComments.data, data];
		},
		[addComment.rejected]: () => {},
	},
});

export const commentReducer = CommentSlice.reducer;
