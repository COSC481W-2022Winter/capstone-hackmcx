import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { CssBaseline } from '@mui/material';
import { IconButton } from '@mui/material';
import Button from '@material-ui/core/Button';
import { Box } from '@mui/system';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
	const [example, setExample] = useState('-_-');
	useEffect(async () => {
		await axios
			.get('http://localhost:3003/api/vi/posts')
			.then((response) => {
				setExample(response.data[0].CURRENT_TIMESTAMP);
			})
			.catch((any) => console.log(any));
	}, [example]);
	let navigate = useNavigate();
	return (
		<div>
			<CssBaseline />
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						onClick={() => {
							navigate('/');
						}}>
						<img
							height='64px'
							width='64px'
							src={require('./faviconButton.ico')}
						/>
					</IconButton>

					<Grid
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid xs={3}>
							<Button variant='contained'>Signin</Button>
						</Grid>

						<Grid xs={3}>
							<Button variant='contained'>User</Button>
						</Grid>
						<Grid xs={3}>
							<Button variant='contained'>Search</Button>
						</Grid>
						<Grid xs={3}>
							<Button
								variant='contained'
								onClick={() => {
									navigate('/CreatePost');
								}}>
								Create Post
							</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<h2>This is our Landing Page!</h2>
			<p>{example}</p>
		</div>
	);
};

export default LandingPage;

/* <IconButton>
	<img src={require('./favicon.ico')} />
</IconButton>; */

/* <Toolbar>Testing 1 2 3</Toolbar> */

/* <Toolbar>
					<IconButton>Test</IconButton>{' '}
				</Toolbar> */

/* <Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='contained'>Trending Posts</Button>
					</Box>

					<Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='contained'>Sign in</Button>
					</Box>

					<Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='contained'>User</Button>
					</Box>

					<Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='contained'>Search</Button>
					</Box>

					<Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
						<Button variant='contained'>Create Post</Button>
					</Box> */
