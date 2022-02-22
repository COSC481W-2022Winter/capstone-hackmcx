import './App.css';
import LandingPage from './LandingPage';
import CreatePost from './CreatePost';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/' exact element={<LandingPage />} />
					<Route exact path='/CreatePost' exact element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
