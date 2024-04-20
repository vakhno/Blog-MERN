import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { getCommentsByIds } from '../redux/slices/comments';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../axios/axios';

export const FullPost = () => {
	const dispatch = useDispatch();
	const currentComments = useSelector((state) => state.comments.currentComments.data);
	const [data, setData] = useState([]);
	const [comments, setComments] = useState([]);
	const [loading, isLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		isLoading(true);
		(async () => {
			await axios
				.get(`/post/post/${id}`)
				.then(async ({ data }) => {
					setData(data);
					console.log('data', data);
					if (data.comments.length) {
						await dispatch(getCommentsByIds({ ids: data.comments }));
					}
					// await axios.get('/comment/comment', { ids: data.comments }).then(({ data }) => {
					// 	const { data: comments } = data;
					// 	setComments(comments);
					// });
				})
				.catch((error) => {
					console.log('error: ', error);
				})
				.finally(() => isLoading(false));
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Post isLoading={loading} />
			) : (
				<>
					<Post
						id={data._id}
						title={data.title}
						imageUrl={data.image}
						author={data.author}
						createdAt={data.createdAt}
						viewsCount={data.viewsCount}
						commentsCount={3}
						tags={data.tags}
						isFullPost>
						<p>{data.text}</p>
					</Post>
					<CommentsBlock items={currentComments} isLoading={false}>
						<AddComment postId={data._id} />
					</CommentsBlock>
				</>
			)}
		</>
	);
};
