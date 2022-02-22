import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './CreatePost';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/CreatePost' exact element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
