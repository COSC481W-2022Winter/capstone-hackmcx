import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import {
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Typography,
	Tooltip,
} from '@mui/material';

function renderPost(props) {
	return (
		<Grid container spacing={5} justifyContent='center' alignItems='center'>
			<Grid item /*Post Component */>
				<Card
					height='100%'
					display='flex'
					flexDirection='column'
					variant='outlined'
					sx={{ width: '30vw', margin: '15px' }}>
					<Tooltip title='Click to view captions' arrow>
						<a href={'individualPost/' + props.post.id}>
							<CardMedia
								component='img'
								paddingTop='56.25%'
								image={props.post.imageUrl}
								alt={props.post.title}
							/>
						</a>
					</Tooltip>
					<CardContent flexGrow='1'>
						<Typography
							style={{}}
							variant={'h3'}
							text={'Text'}
							noWrap={false}
							paragraph={false}
							color={'initial'}
							align={'center'}
							gutterBottom={false}>
							{props.post.title}
							<Typography
								variant={'h6'}
								text={'Text'}
								noWrap={false}
								paragraph={false}
								color={'initial'}
								align={'center'}
								style={{ marginTop: '10px' }}>
								{props.post.caption}
							</Typography>
							<Rating name='simple-controlled' value={3} />
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default renderPost;
