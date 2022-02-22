import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { CssBaseline } from '@mui/material';
import { IconButton } from '@mui/material';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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
							<Button variant='contained'>Create Post</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<br />
			<br />
			<br />
			<br />
			<h2>This is our Landing Page!</h2>
		</div>
	);
};

export default LandingPage;
