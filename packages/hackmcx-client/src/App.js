import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import LandingPage from './LandingPage';
import PostPage from './PostPage';


function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
          <Route exact path='/' exact element={<LandingPage />} />
					<Route exact path='/CreatePost' exact element={<CreatePost />} />
          <Route exact path='/PostPage' exact element={<PostPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
