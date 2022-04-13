import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const CreatePost = () => {
	const nav = useNavigate();

	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [titleHelper, setTitleHelper] = useState('Please enter a valid title.');
	//	const [urlHelper, setURLHelper] = useState('Image URL cannot be empty.');
	//	const [imageUrlError, setImageUrlError] = useState(true);
	const [uploadError, setUploadError] = useState(true);
	const [titleError, setTitleError] = useState(true);
	const [selectedFile, setSelectedFile] = useState(false);

	const Input = styled('input')({
		display: 'none',
	});

	const token = localStorage.getItem('authToken');
	let header = {
		headers: { Authorization: 'Bearer ' + token },
	};

	function validationTitle(val) {
		if (!val || val === '' || /^\s*$/.test(val)) {
			setTitleError(true);
			setTitleHelper('Please enter a valid title.');
		} else {
			setTitle(val);
			setTitleError(false);
			setTitleHelper('');
		}
	}

	function onFileChange(e) {
		// Update the state
		// this.setState({ selectedFile: e.target.files[0] });
		if (selectedFile != null) {
			setUploadError(false);
		} else {
			setUploadError(true);
		}
		setSelectedFile(e.target.files[0]);
	}

	function onFileUpload() {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			'myFile',
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		//axios.post('api/uploadfile', formData);
	}

	function fileData() {
		if (selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>

					<p>File Name: {selectedFile.name}</p>

					<p>File Type: {selectedFile.type}</p>

					<p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	}

	//When the create post button is clicked, this function will be called.
	function postRequest() {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts`,
				{
					title: title,
					imageUrl: imageUrl,
				},
				header
			)
			.then(
				(response) => {
					console.log(response);
					//setImageUrlError(false);
					setTitleError(false);
				},
				(error) => {
					if (error == 'Error: Request failed with status code 401') {
						alert('Unauthorized action, redirecting you to the Log in Page');
						nav(`/login`);
					} else {
						alert('Caption could not be rated!');
					}
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
							helperText={titleHelper}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={7}>
				<Grid container direction={'row'} spacing={2} alignItems={'center'}>
					<Grid item xs={12}>
						<Grid container direction={'row'} alignItems={'center'}>
							<Grid item xs={12}>
								{/* <input
									type='file'
									onChange={onFileChange}
									id='contained-button-file'
								/> */}

								<label htmlFor='contained-button-file'>
									<Input
										accept='image/*'
										id='contained-button-file'
										multiple
										type='file'
										onChange={onFileChange}
									/>
									<Button
										variant='contained'
										fullWidth
										component='span'
										onClick={() => onFileUpload()}
										color='secondary'>
										Upload Image
									</Button>
									{selectedFile.name}
								</label>
								{/* <label htmlFor='icon-button-file'>
									<Input accept='image/*' id='icon-button-file' type='file' />
									<IconButton
										color='primary'
										aria-label='upload picture'
										component='span'>
										<PhotoCamera />
									</IconButton>
								</label> */}
								{/* <label htmlFor='contained-button-file'> */}
								{/* <Button
									//error={titleError}
									accept='image/*'
									id='icon-button-file'
									type='file'
									htmlFor='icon-button-file'
									fullWidth
									size='medium'
									variant='contained'
									color='secondary'
									label='Image Upload'
									onClick={onFileUpload}
									//disabled={uploadOption}
								>
									Upload Image
								</Button> */}
								{/* </label> */}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={7} align={'center'}>
				<Button
					fullWidth
					size='medium'
					variant='contained'
					color='secondary'
					disabled={titleError || uploadError}
					onClick={() => postRequest()}
					component={Link}
					to='/'>
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreatePost;
