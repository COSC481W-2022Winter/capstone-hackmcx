import './App.css';
import {Route, BrowserRouter, Routes, useParams} from 'react-router-dom';
import CreatePost from './components/posts/CreatePost';
import PostList from './components/posts/PostList';
import IndividualPost from './components/posts/IndividualPost';
import AppNav from "./AppNav";
import Grid from "@material-ui/core/Grid";
import UserProfile from './components/UserProfile';

export default function App() {
	return (
		<Grid container direction="column" spacing={3}>
			<BrowserRouter>
				<Grid item xs={12}>
					<AppNav/>
				</Grid>
					<Grid item xs={12}>
						<Routes>
							<Route exact path="/" element={<PostList/>}/>
							<Route exact path="/posts/create" element={<CreatePost/>}/>
<<<<<<< HEAD
							<Route exact path="/user/:userId" element={<UserProfile/>}/>
=======
							<Route exact path="/individualPost/:postId" element={<IndividualPost/>}/>
>>>>>>> main
						</Routes>
					</Grid>
			</BrowserRouter>
		</Grid>
	);
}


