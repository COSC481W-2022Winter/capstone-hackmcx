import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import CreatePost from './CreatePost';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<LandingPage />
				<Routes>
					<Route exact path='/' exact element={<LandingPage />} />
					<Route exact path='/CreatePost' exact element={<CreatePost />} />
					{/* <Route path='/Products' element={<Products />} />
					<Route path='/Made' element={<Made />} />
					<Route path='/Info' element={<Info />} /> */}
					{/* <Route path='*' element={<ErrorPage />} /> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
