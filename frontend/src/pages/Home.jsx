import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
	const dispatch = useDispatch();
	const { posts, tags } = useSelector((state) => state.posts);
	const isPostsLoading = posts.status === 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	console.log('posts', posts);

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
				<Tab label="New" />
				<Tab label="Popular" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={obj._id}
								title={obj.title}
								imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
								user={obj.author}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								tags={obj.tags}
								isEditable
							/>
						),
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
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
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};