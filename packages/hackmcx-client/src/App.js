import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './CreatePost';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/' exact element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
