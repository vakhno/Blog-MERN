import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios/axios';

export const FullPost = () => {
	const [data, setData] = useState([]);
	const [loading, isLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		isLoading(true);
		axios
			.get(`/post/post/${id}`)
			.then(({ data }) => {
				setData(data);
			})
			.catch((error) => {
				console.log('error: ', error);
			})
			.finally(() => isLoading(false));
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
						user={data.author}
						createdAt={data.createdAt}
						viewsCount={data.viewsCount}
						commentsCount={3}
						tags={data.tags}
						isFullPost>
						<p>{data.text}</p>
					</Post>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Bob Trash',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'My beautiful comment #1',
							},
							{
								user: {
									fullName: 'Isaac Novak',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'My beautiful comment #2',
							},
						]}
						isLoading={false}>
						<Index />
					</CommentsBlock>
				</>
			)}
		</>
	);
};
