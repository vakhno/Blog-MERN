import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { authSignUp } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
export const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		dispatch(authSignUp({ values: data, navigate }));
	};

	return (
		<Paper classes={{ root: styles.root }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography classes={{ root: styles.title }} variant="h5">
					Account creation
				</Typography>
				<div className={styles.avatar}>
					<Avatar sx={{ width: 100, height: 100 }} />
				</div>
				<TextField
					{...register('fullName', { required: 'Fill name' })}
					className={styles.field}
					label="Полное имя"
					fullWidth
				/>
				<TextField
					{...register('email', { required: 'Fill email' })}
					className={styles.field}
					label="E-Mail"
					fullWidth
				/>
				<TextField
					{...register('password', { required: 'Fill password' })}
					className={styles.field}
					label="Пароль"
					fullWidth
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Sign up
				</Button>
			</form>
		</Paper>
	);
};
