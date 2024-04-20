import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/material/TabPanel';
// import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
	const dispatch = useDispatch();
	const [selectedTab, setSelectedTab] = useState('1');
	const { posts, tags } = useSelector((state) => state.posts);
	const isPostsLoading = posts.status === 'loading';

	// useEffect(() => {
	// 	dispatch(fetchPosts());
	// }, []);

	const handleTabChange = (_, value) => {
		setSelectedTab(value);
	};

	return (
		<>
			<Tabs
				value={selectedTab}
				onChange={handleTabChange}
				style={{ marginBottom: 15 }}
				aria-label="basic tabs example">
				<Tab value="1" label="New" />
				<Tab value="2" label="Popular" />
			</Tabs>
			<Grid container spacing={4}>
				{selectedTab === '1' ? (
					<Grid xs={8} item>
						{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
							isPostsLoading ? (
								<Post key={index} isLoading={true} />
							) : (
								<Post
									key={index}
									id={obj._id}
									title={obj.title}
									imageUrl={obj.image}
									user={obj.author}
									createdAt={obj.createdAt}
									viewsCount={obj.viewsCount}
									commentsCount={3}
									tags={obj.tags}
									author={obj.author}
									isEditable
								/>
							),
						)}
					</Grid>
				) : selectedTab === '2' ? (
					<Grid xs={8} item>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ad provident harum.
						Enim vel quis blanditiis illum facilis veniam, dolores, cupiditate dolorem ipsa
						reprehenderit repellendus velit consectetur quas. Ipsa, hic.
					</Grid>
				) : null}
				<Grid xs={4} item>
					<TagsBlock />
					{/* <CommentsBlock
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
					/> */}
				</Grid>
			</Grid>
		</>
	);
};
