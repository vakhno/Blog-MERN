import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from '../../axios/axios';
import { addComment } from '../../redux/slices/comments';
import { useSelector, useDispatch } from 'react-redux';

export const AddComment = ({ postId = null }) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const userId = useSelector((state) => state.auth.isUserLoggedIn && state.auth.data._id);
	const sendComment = async () => {
		if (userId) {
			const fields = {
				text: value,
				post: postId,
				author: userId,
			};
			await dispatch(addComment({ fields, id: postId }));

			// const res = await axios.post('/comment/comment', {fields, id: postId});
			// console.log('res', res);
			// await dispatch(addComment({ id: postId, newComment: res.data._id }));
		}
	};
	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src="https://mui.com/static/images/avatar/5.jpg"
				/>
				<div className={styles.form}>
					<TextField
						label="Add comment"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						onChange={(e) => setValue(e.target.value)}
						value={value}
					/>
					<Button variant="contained" onClick={sendComment}>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};
