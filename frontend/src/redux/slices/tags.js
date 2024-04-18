import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const getPopularTags = createAsyncThunk('tags/getPopularTags', async () => {
	const { data } = await axios.get('/tag/populartag');
	return data;
});

export const getAllTags = createAsyncThunk('tags/getAllTags', async () => {
	const { data } = await axios.get('/tag/tag');
	console.log('getAllTags', data);
	return data.tags;
});

const initialState = {
	popularTags: {
		data: [],
		loading: 'loading',
	},
	allTags: {
		data: [],
		loading: 'loading',
	},
};

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {},
	extraReducers: {
		[getPopularTags.pending]: (state) => {
			state.popularTags.loading = 'loading';
		},
		[getPopularTags.fulfilled]: (state, action) => {
			state.popularTags.loading = 'loaded';
			state.popularTags.data = action.payload;
		},
		[getPopularTags.rejected]: (state) => {
			state.popularTags.loading = 'error';
		},
		[getAllTags.pending]: (state) => {
			state.allTags.loading = 'loading';
		},
		[getAllTags.fulfilled]: (state, action) => {
			state.allTags.loading = 'loaded';
			state.allTags.data = action.payload;
		},
		[getAllTags.rejected]: (state) => {
			state.allTags.loading = 'error';
		},
	},
});

export const tagsReducer = tagsSlice.reducer;
