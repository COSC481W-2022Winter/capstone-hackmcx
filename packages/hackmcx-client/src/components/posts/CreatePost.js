import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [titleHelper, setTitleHelper] = useState("Please enter a valid title.");
	const [urlHelper, setURLHelper] = useState("Image URL cannot be empty.");
	const [imageUrlError, setImageUrlError] = useState(true);
	const [titleError, setTitleError] = useState(true);

	function validationTitle(val) {
		if (!val || val === '' || /^\s*$/.test(val)) {
			setTitleError(true);
			setTitleHelper("Please enter a valid title.")
		}
		else{
			setTitle(val);
			setTitleError(false);
			setTitleHelper("")
		} 
	}

	function validationImageURL(val) {
		if (!val || val === '') {
			setImageUrlError(true);
			setURLHelper("Image URL cannot be empty.")
		} 
		else if (!/(https?:\/\/.*\.(?:png|jpg|gif|svg))/i.test(val)) {
			setImageUrlError(true);
			setURLHelper("Image URL is not a valid URL")
		}
		else{
			setImageUrl(val);
			setImageUrlError(false);
			setURLHelper("")
		}
	}

	//When the create post button is clicked, this function will be called.
	function postRequest() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/v1/posts`, {
				title: title,
				imageUrl: imageUrl,
			})
			.then(
				(response) => {
					console.log(response);
					setImageUrlError(false);
					setTitleError(false);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	return (
		<Grid
			container
			direction={'row'}
			spacing={3}
			justifyContent={'center'}
			alignItems={'stretch'}>
			<Grid item xs={7}>
				<Grid container direction={'row'} alignItems={'center'}>
					<Grid item xs={11}>
						<ImageIcon fontSize='large' />
						<TextField
							error={titleError}
							fullWidth
							variant='filled'
							color='primary'
							type='string'
							label='Post Title'
							onChange={(e) => validationTitle(e.target.value)}
							helperText = {titleHelper}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={7}>
				<Grid container direction={'row'} spacing={2} alignItems={'center'}>
					<Grid item xs={11}>
						<LinkIcon fontSize='large' />
						<TextField
							error={imageUrlError}
							fullWidth
							variant='filled'
							color='primary'
							type='url'
							label='Image URL'
							onChange={(e) => validationImageURL(e.target.value)}
							helperText = {urlHelper}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} align={'center'}>
				<Button
					fullWidth
					size='medium'
					variant='contained'
					color='secondary'
					disabled = {(titleError || imageUrlError)}
					onClick={() => postRequest()}
					component = {Link}
					to="/">
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreatePost;
