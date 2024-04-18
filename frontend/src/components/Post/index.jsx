import React from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { deletePost } from '../../redux/slices/posts';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useSelector, useDispatch } from 'react-redux';

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	author,
	isEditable,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => {
		console.log('state', state);
		return state.auth.isUserLoggedIn && state.auth.data._id;
	});

	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = async () => {
		const isRemovingConfirmed = window.confirm('Do you realy want to delete Post?');
		if (isRemovingConfirmed) {
			try {
				await dispatch(deletePost({ id }));
				navigate('/');
			} catch (error) {}
		}
	};

	console.log('AAAAAAAAAAAAU', author, userId, imageUrl);
	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{userId === author._id && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={`http://localhost:4444${imageUrl}`}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((name) => (
							<li key={name}>
								<Link to={`/tag/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
