import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const authLogin = createAsyncThunk('auth/fetchUserData', async (params) => {
	console.log('PAR', params);
	const { data } = axios.post('/auth/login', params);
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
};

const authSlise = createSlice({
	name: 'auth',
	initialState,
	extraReducers: {
		[authLogin.pending]: (state) => {
			state.status = 'laoding';
		},
		[authLogin.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = 'loaded';
		},
		[authLogin.rejected]: (state) => {
			state.status = 'error';
		},
	},
});

export const authReducer = authSlise.reducer;
