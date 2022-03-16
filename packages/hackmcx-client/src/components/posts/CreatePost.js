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
	const [imageUrlError, setImageUrlError] = useState(false);
	const [titleError, setTitleError] = useState(false);

	/*
	function validateURL() {
		//return (imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
		var image = new Image();
		image.onload = function() {
			if (this.width > 0) {
				return true;
			}
		}
		image.onerror = function() {
			return false;
		}
		image.src = imageUrl;
	} */

	//When the create post button is clicked, this function will be called.
	function postRequest() {
		if (title === '' || imageUrl === '') {
			if(title === '' && imageUrl === '') {
				alert('Enter a title and valid image before submitting');
				setImageUrlError(true); setTitleError(true);
			} else if (imageUrl === '') {
				alert('Enter a valid image before submitting');
				setImageUrlError(true);
			} else {
				alert('Enter a title before submitting');
				setTitleError(true);
			}
		} /*
		else if (validateURL()) {
			alert('Image URL is not a valid')
			setImageUrlError(true)
		} */ else {
			axios
				.post(`${process.env.REACT_APP_API_URL}/api/v1/posts`, {
					title: title,
					imageUrl: imageUrl,
				})
				.then(
					(response) => {
						alert('Post Succesfully Created!');
						console.log(response);
						setImageUrlError(false); 
						setTitleError(false);
					},
					(error) => {
						alert('Error, post could not be Created!');
						console.log(error);
					}
				);
			}
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
							error={titleError}
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
							error={imageUrlError}
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
