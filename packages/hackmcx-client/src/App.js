import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CreatePost from './components/posts/CreatePost';
import PostList from './components/posts/PostList';
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
							<Route exact path="/user/:id" element={<UserProfile/>}/>
						</Routes>
					</Grid>
			</BrowserRouter>
		</Grid>
	);
}

