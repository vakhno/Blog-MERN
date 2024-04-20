import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import axios from '../../axios/axios';
import { getAllTags } from '../../redux/slices/tags';
import { addPost, editPost, fetchPost, removePost } from '../../redux/slices/posts';
import { useSelector, useDispatch } from 'react-redux';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

export const AddPost = () => {
	const { id: editableId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { _id: userId } = useSelector((state) => state.auth.data);
	const { data: allTags } = useSelector((state) => state.tags.allTags);
	const { data: selectedPost } = useSelector((state) => state.posts.currentPost);
	console.log('!!!!!!!!', selectedPost);
	// const reader = new FileReader();
	const [tags, setTags] = useState([]);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const inputFileRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewFile, setPreviewFile] = useState(null);
	const { register, handleSubmit } = useForm({
		defaultValues: {
			title: '',
			text: '',
			image: '',
			tags: '',
		},
	});

	useEffect(() => {
		(async () => {
			await dispatch(getAllTags());
			if (editableId) {
				await dispatch(fetchPost({ id: editableId }));
			}
		})();
		return () => dispatch(removePost());
	}, []);

	useEffect(() => {
		(async () => {
			setTitle(selectedPost.title);
			setText(selectedPost.text);
			setTags(selectedPost.tags);
			const response = await fetch(`http://localhost:4444${selectedPost.image}`);
			const blob = await response.blob();
			setSelectedFile(blob);
		})();
	}, [selectedPost]);

	useEffect(() => {
		(async () => {
			setTitle(selectedPost.title);
			setText(selectedPost.text);
			setTags(selectedPost.tags);
			const response = await fetch(`http://localhost:4444${selectedPost.image}`);
			const blob = await response.blob();
			setSelectedFile(blob);
		})();
	}, [selectedPost]);

	useEffect(() => {
		if (inputFileRef.current) {
			setPreviewFile(null);
			inputFileRef.current.value = '';
		}
		if (selectedFile) {
			const previewObject = URL.createObjectURL(selectedFile);
			setPreviewFile(previewObject);
		}
		return () => previewFile && window.URL.revokeObjectURL(previewFile);
	}, [selectedFile]);

	const handleChangeFile = (e) => {
		try {
			const file = e.target.files[0];
			setSelectedFile(file);
		} catch (error) {
			console.log('err', error);
		}
	};

	const onClickRemoveImage = (e) => {
		setPreviewFile(null);
		setSelectedFile(null);
	};

	const onTextChange = React.useCallback((value) => {
		setText(value);
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Enter text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	const onSubmit = async () => {
		let formData = null;

		if (selectedFile) {
			formData = new FormData();
			formData.append('image', selectedFile);
		}

		const fields = {
			title: title,
			text: text,
			tags: tags,
		};
		if (editableId) {
			try {
				await dispatch(editPost({ id: editableId, fields, imageFile: formData }));
				navigate(`/posts/${editableId}`);
			} catch (error) {}
		} else {
			try {
				await dispatch(addPost({ fields, imageFile: formData }));
				navigate('/');
			} catch (error) {}
		}
	};

	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<Paper style={{ padding: 30 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
					Load preview
				</Button>
				<input
					ref={inputFileRef}
					// {...register('image')}
					type="file"
					onChange={handleChangeFile}
					hidden
				/>
				{previewFile && (
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Delete
					</Button>
				)}
				{previewFile && <img className={styles.image} src={previewFile} alt="Uploaded" />}
				<br />
				<br />
				<TextField
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					// {...register('title')}
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="Post title..."
					fullWidth
				/>
				{/* <TextField
					{...register('tags')}
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Tags"
					fullWidth
				/> */}
				<Autocomplete
					multiple
					id="tags-standard"
					options={allTags}
					defaultValue={tags}
					onChange={(_, values) => setTags(values)}
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField {...params} variant="standard" placeholder="Add tags..." />
					)}
				/>
				<SimpleMDE
					// {...register('text')}

					className={styles.editor}
					value={text}
					onChange={onTextChange}
					options={options}
				/>
				<div className={styles.buttons}>
					<Button type="submit" size="large" variant="contained">
						{editableId ? 'Edit' : 'Publish'}
					</Button>
					{/* <a href="/"> */}
					<Button size="large" onClick={handleCancel}>
						Cancel
					</Button>
					{/* </a> */}
				</div>
			</form>
		</Paper>
	);
};
