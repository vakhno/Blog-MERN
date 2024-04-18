import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SideBlock } from './SideBlock';
import { useSelector } from 'react-redux';

export const TagsBlock = () => {
	const { data, loading } = useSelector((state) => state.tags.popularTags);
	console.log('data', data, loading);
	return (
		<SideBlock title="Popular tags: ">
			<List>
				{loading === 'loaded'
					? data.map((name, i) => (
							<a key={i} style={{ textDecoration: 'none', color: 'black' }} href={`/tags/${name}`}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon style={{ overflow: 'hidden', width: '100%' }}>
											<TagIcon />
											<span
												style={{
													overflow: 'hidden',
													width: '100%',
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
												}}></span>
										</ListItemIcon>
									</ListItemButton>
								</ListItem>
							</a>
					  ))
					: loading === 'error'
					? 'Oops! Something went wrong!'
					: [...Array(3)].map((_, i) => (
							<ListItem disablePadding>
								<ListItemButton>
									<Skeleton key={i} height={40} style={{ width: '100%' }} />
								</ListItemButton>
							</ListItem>
					  ))}
			</List>
		</SideBlock>
	);
};
