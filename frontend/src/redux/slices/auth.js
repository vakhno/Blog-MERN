import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const authLogin = createAsyncThunk('auth/fetchUserData', async (params) => {
	const { values, navigate } = params;
	const { data } = await axios.post('/auth/login', values);
	console.log('authLogin', data);
	return { data, navigate };
});

export const authSignUp = createAsyncThunk('auth/authSignUp', async (params) => {
	const { values, navigate } = params;
	const { data } = await axios.post('/auth/signup', values);
	return { data, navigate };
});

export const checkingIsUserAlreadyLoggedIn = createAsyncThunk(
	'auth/checkingIsUserAlreadyLoggedIn',
	async () => {
		const { data } = await axios.get('/profile/me');
		const { data: user } = data;
		return user;
	},
);

const initialState = {
	isUserLoggedIn: false,
	data: null,
	status: 'loading',
};

const authSlise = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			state.isUserLoggedIn = false;
			window.localStorage.removeItem('token');
		},
	},
	extraReducers: {
		[authLogin.pending]: (state) => {
			state.status = 'laoding';
		},
		[authLogin.fulfilled]: (state, action) => {
			const { data, navigate } = action.payload;
			console.log('LOGIN', data);
			state.data = data.user;
			state.status = 'loaded';
			state.isUserLoggedIn = true;
			if (data?.token) {
				window.localStorage.setItem('token', data.token);
			}
			navigate('/');
		},
		[authLogin.rejected]: (state) => {
			state.status = 'error';
		},
		[checkingIsUserAlreadyLoggedIn.pending]: (state) => {
			state.status = 'loading';
		},
		[checkingIsUserAlreadyLoggedIn.fulfilled]: (state, action) => {
			state.isUserLoggedIn = true;
			state.data = action.payload;
			state.status = 'loaded';
		},
		[checkingIsUserAlreadyLoggedIn.rejected]: (state) => {
			state.isUserLoggedIn = false;
			state.data = null;
			state.status = 'loaded';
		},
		[authSignUp.pending]: (state) => {
			state.status = 'loading';
		},
		[authSignUp.fulfilled]: (state, action) => {
			const { data, navigate } = action.payload;
			state.data = data.user;
			state.status = 'loaded';
			state.isUserLoggedIn = true;
			if (data?.token) {
				window.localStorage.setItem('token', data.token);
			}
			navigate('/');
		},
		[authSignUp.rejected]: (state) => {
			state.status = 'error';
		},
	},
});

export const authReducer = authSlise.reducer;
export const { logout } = authSlise.actions;
