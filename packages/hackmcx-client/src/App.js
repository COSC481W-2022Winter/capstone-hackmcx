import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CreatePost from './components/posts/CreatePost';
import PostList from './components/posts/PostList';
import ErrorPage from './components/ErrorPage';
import AppNav from "./AppNav";
import Grid from "@material-ui/core/Grid";
import UserProfile from './components/UserProfile';
import Post from "./components/posts/Post";

export default function App() {
	return (
		<Grid container direction="column" spacing={5}>
			<BrowserRouter>
				<Grid item>
					<AppNav/>
				</Grid>
				<Grid container direction={"row"} justifyContent={"center"} >
					<Grid item xs={10} sm={8} md={6} lg={4}>
						<Routes>
							<Route exact path="/" element={<PostList/>}/>
							<Route exact path="/posts/create" element={<CreatePost/>}/>
							<Route exact path="/user/:userId" element={<UserProfile/>}/>
							<Route exact path="/posts/:postId" element={<Post/>}/>
							<Route exact path="/error/404" element={<ErrorPage/>}/>
						</Routes>
					</Grid>
				</Grid>
			</BrowserRouter>
		</Grid>
	);
}


