import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { useState } from 'react';
import {Box, FormControl} from "@mui/material";

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	//When the create post button is clicked, this function will be called.
	function postRequest() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/v1/posts`, {
				title: title,
				imageUrl: imageUrl,
			})
			.then(
				(response) => {
					alert('Post Succesfully Created!');
					console.log(response);
				},
				(error) => {
					alert('Error, post could not be Created!');
					console.log(error);
				}
			);
	}

	return (
		<Grid container direction={"row"} spacing={3} justifyContent={"center"} alignItems={"stretch"}>
			<Grid item xs={7}>
				<Grid container direction={"row"}  alignItems={"center"}>
					<Grid item xs={1}>
						<ImageIcon fontSize="large"/>
					</Grid>
					<Grid item xs={11}>
						<TextField
							fullWidth
							variant='filled'
							color='primary'
							type='string'
							label='Post Title'
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={7}>
				<Grid container direction={"row"} spacing={2} alignItems={"center"}>
					<Grid item xs={1}>
						<LinkIcon fontSize="large"/>
					</Grid>
					<Grid item xs={11}>
						<TextField
							fullWidth
							variant='filled'
							color='primary'
							type='url'
							label='Image URL'
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} align={"center"}>
				<Button
					fullWidth
					size='medium'
					variant='contained'
					color='secondary'
					onClick={() => postRequest()}
				>
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreatePost;
