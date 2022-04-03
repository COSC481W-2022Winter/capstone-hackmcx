import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

export default function AppNav() {
	let visibility = null;

	if (
		localStorage.getItem('authToken') != null &&
		localStorage.getItem('tokenExpires') > Date.now()
	) {
		visibility = true;
	} else {
		visibility = false;
	}

	return (
		<React.Fragment>
			<AppBar position='fixed'>
				<Toolbar>
					<Link to={'/'} color='inherit'>
						<IconButton size={'large'} sx={{ mr: 2 }}>
							<Avatar src={'/imgs/logo.png'} />
							<Typography variant='h6' sx={{ marginLeft: 2 }}>
								Warai
							</Typography>
						</IconButton>
					</Link>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ marginRight: 2 }}>
						{visibility == true && (
							<Link to={'/posts/create'}>
								<Button variant='contained' sx={{ mt: 2 }}>
									Create Post
								</Button>
							</Link>
						)}
					</Box>
					{visibility == false && (
						<Link to={'/login'}>
							<Button variant='contained' sx={{ mt: 2 }}>
								Sign In
							</Button>
						</Link>
					)}
					{visibility == true && (
						<Link to={'user/' + localStorage.getItem('username')}>
							<Button variant='contained' sx={{ mt: 2 }}>
								Profile
							</Button>
						</Link>
					)}
					<Box sx={{ marginLeft: 2 }}>
						{visibility == true && (
							<Link to={'/logout'}>
								<Button variant='contained' sx={{ mt: 2 }}>
									Log out
								</Button>
							</Link>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}
