import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import axios from '../../axios/axios';
import { logout } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';

export const Header = () => {
	const { isUserLoggedIn, data } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		const isLogoutConfirmed = window.confirm('Do you realy want to Log out?');
		if (isLogoutConfirmed) {
			dispatch(logout());
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isUserLoggedIn ? (
							<>
								<Link to="/add-post">
									<Button variant="contained">Add post</Button>
								</Link>
								<Button onClick={onClickLogout} variant="contained" color="error">
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Log in</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Create an account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
