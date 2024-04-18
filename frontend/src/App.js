import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkingIsUserAlreadyLoggedIn } from './redux/slices/auth';
import { fetchPosts } from './redux/slices/posts';
import { getPopularTags } from './redux/slices/tags';
function App() {
	const dispatch = useDispatch();
	const [loading, isLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(checkingIsUserAlreadyLoggedIn());
			await dispatch(fetchPosts());
			await dispatch(getPopularTags());
			isLoaded(true);
		})();
	}, []);

	return (
		<>
			{loading ? (
				<>
					<Header />
					<Container maxWidth="lg">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/posts/:id" element={<FullPost />} />
							<Route path="/posts/:id/edit" element={<AddPost />} />
							<Route path="/add-post" element={<AddPost />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Registration />} />
						</Routes>
					</Container>
				</>
			) : null}
		</>
	);
}

export default App;
