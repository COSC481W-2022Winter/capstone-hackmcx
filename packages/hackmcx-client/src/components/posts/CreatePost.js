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
	const [titleHelper, setTitleHelper] = useState('Please enter a valid title.');
	const [uploadHelper, setUploadHelper] = useState('Must upload an image');
	const [uploadError, setUploadError] = useState(true);
	const [titleError, setTitleError] = useState(true);
	const [selectedFile, setSelectedFile] = useState(false);
	const [base64, setBase64] = useState('');

	var B64 = 'testing';

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

	function onFileChange(e, B64) {
		// Update the state
		// this.setState({ selectedFile: e.target.files[0] });
		if (selectedFile != null) {
			setUploadError(false);
			setUploadHelper('');
			setSelectedFile(e.target.files[0]);
			var promise = getBase64(e.target.files[0]);
			promise.then(function (result) {
				// setBase64(result);

				B64 = result.slice(22, result.length - 1);

				alert(B64);
			});
			asyncCall(e.target.files[0]);
		} else {
			setUploadError(true);
			setUploadError('Must upload an image');
		}
		// setSelectedFile(e.target.files[0]);

		// getBase64(e.target.files[0]);
	}
	// function getBase64(file) {
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onload = function () {
	// 		console.log(reader.result);
	// 		setBase64(reader.result);

	// 	};
	// 	reader.onerror = function (error) {
	// 		console.log('Error: ', error);
	// 	};
	// }

	async function asyncCall(img) {
		const result = await getBase64(img);
		setBase64(result);
	}

	function getBase64(file) {
		return new Promise(function (resolve, reject) {
			var reader = new FileReader();
			reader.onload = function () {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	function onFileUpload() {
		const formData = new FormData();

		formData.append(
			'myFile',
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		console.log(this.state.selectedFile);
	}

	function postRequest() {
		alert(B64);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts`,
				{
					imageData: B64,
					title: title,
				},
				header
			)
			.then(
				(response) => {
					console.log(response);
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
					<Grid item xs={12}>
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
								<label htmlFor='contained-button-file'>
									<Input
										accept='image/*'
										id='contained-button-file'
										multiple
										type='file'
										helperText={uploadHelper}
										onChange={(e) => onFileChange(e, B64)}
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
									{uploadHelper}
								</label>
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
					onClick={() => postRequest(B64)}
					component={Link}
					to='/'>
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreatePost;
