import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

var B64;
var extraChar;
const CreatePost = () => {
	const nav = useNavigate();
	const [title, setTitle] = useState('');
	const [titleHelper, setTitleHelper] = useState('Please enter a valid title.');
	const [uploadHelper, setUploadHelper] = useState('No image selected. Please select a jpg or png file less than 1MB in size.');
	const [uploadError, setUploadError] = useState(true);
	const [titleError, setTitleError] = useState(true);
	const [selectedFile, setSelectedFile] = useState(false);
	const [base64, setBase64] = useState('');

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
		if (selectedFile != null) {
			setUploadError(false);
			setUploadHelper('');
			setSelectedFile(e.target.files[0]);
			var promise = getBase64(e.target.files[0]);
			promise.then(function (result) {
				extraChar = result.slice(22,23);
				B64 = result.slice(23, result.length);
			});
			asyncCall(e.target.files[0]);
		} else {
			setUploadError(true);
			setUploadError('No image selected');
		}
	}

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
	function postRequest(B64,extraChar) {
		if (selectedFile.type == 'image/png') {
			B64 = extraChar + B64.slice(0, B64.length - 2);
		}
		if (B64.length >= 1333336){
			alert('Image size must be less than or equal to 1 mb!');
			return;
		}
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
						nav('/')
					},
					(error) => {
						if (error == 'Error: Request failed with status code 401') {
							alert('Unauthorized action, redirecting you to the Log in Page');
							nav(`/login`);
						} else {
							alert('Post could not be created!');
						}
					}
				);
	}

	function jpegOrNot(type) {
		if (type === 'image/jpg' || 'image/jpeg') {
			return 'jpeg  selected';
		} else if (type === 'image/png') {
			return 'png is not  supported, upload jpeg or jpg';
		}
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
										onChange={(e) => onFileChange(e)}
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
					onClick={() => postRequest(B64,extraChar)}
				>
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreatePost;
