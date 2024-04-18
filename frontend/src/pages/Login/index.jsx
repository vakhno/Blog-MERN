import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = (values) => {
		dispatch(authLogin({ values, navigate }));
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Account Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
					{...register('email', { required: 'Fill email' })}
				/>
				<TextField
					className={styles.field}
					label="Password"
					fullWidth
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Fill password' })}
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Login
				</Button>
			</form>
		</Paper>
	);
};
