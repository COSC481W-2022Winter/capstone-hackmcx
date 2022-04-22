import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }
var B64;
var extraChar;

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(4),
		outline: 'none',
	},
}));

function SimpleModal(props) {
	const [open, setOpen] = useState(false);
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [modalData, setData] = useState();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	//const onSubmit = data => console.log(data);
	const onSubmit = async (data) => {
		// if (selectedFile.type == 'image/png') {
		// 	B64 = extraChar + B64.slice(0, B64.length - 2);
		// }
		if (B64.length >= 1333336) {
			alert('Image size must be less than or equal to 1 mb!');
		}

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('authToken') + '',
			},
			body: JSON.stringify(data),
		};
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/v1/users/${props.user.username}`,
			requestOptions
		);
		const jsonData = await response.status;

		console.log(jsonData);
		window.location.href = window.location.href;
		navigate(`/user/${props.user.username}`);
	};

	const data = [
		{
			title: 'Update Account Information',
			Info: 'Update Account Information',
		},
	];
	const [title, setTitle] = useState('');
	const [titleHelper, setTitleHelper] = useState('Please enter a valid title.');
	const [uploadHelper, setUploadHelper] = useState('No image selected. Please select a jpg or png file less than 1MB in size.');
	const [uploadError, setUploadError] = useState(true);
	const [titleError, setTitleError] = useState(true);
	const [selectedFile, setSelectedFile] = useState(false);
	const [base64, setBase64] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	//////////////////////////SPRINT 4 CODE//////////////////////////////////

	///////////////////////////POST REQUEST CODE ////////////////////
	const nav = useNavigate();

	const token = localStorage.getItem('authToken');
	let header = {
		headers: { Authorization: 'Bearer ' + token },
	};
	function postRequest(B64, extraChar) {
		// if (selectedFile.type == 'image/png') {
		// 	B64 = extraChar + B64.slice(0, B64.length - 2);
		// }
		if (B64.length >= 1333336) {
			alert('Image size must be less than or equal to 1 mb!');
		}
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts`,
				{
					username: 'something',
					first_name: firstName,
					last_name: lastName,
					imageData: B64,
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
					} else if (B64.length >= 1333336) {
						alert('Image size must be less than or equal to 1 mb!');
					} else {
						alert('Post could not be created!');
					}
				}
			);
	}

	const Input = styled('input')({
		display: 'none',
	});

	function onFileChange(e) {
		if (selectedFile != null) {
			setUploadError(false);
			setUploadHelper('');
			setSelectedFile(e.target.files[0]);
			var promise = getBase64(e.target.files[0]);
			promise.then(function (result) {
				extraChar = result.slice(22, 23);
				B64 = result.slice(23, result.length);
				//	B64 = result;

				// var data;
				const fromDb = undefined;

				// ✅ Objects
				const obj = fromDb || {};
				obj.firstname = `${props.user.first_name}`;
				obj.lastname = `${props.user.last_name}`;
				obj.imageData = B64;

				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('authToken') + '',
					},
					body: JSON.stringify(obj),
				};

				const response = fetch(
					`${process.env.REACT_APP_API_URL}/api/v1/users/${props.user.username}`,
					requestOptions
				);
				const jsonData = response.status;

				console.log('FORMIMAHE' + jsonData);
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

	const CustomModal = () => {
		if (
			localStorage.getItem('authToken') != null &&
			localStorage.getItem('tokenExpires') > Date.now()
		) {
			let preview = null;
			if(selectedFile){
				preview = <center><img src={selectedFile && URL.createObjectURL(selectedFile)}height="125" width="125"/></center>
			}
			return modalData ? (
				<Modal
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
					open={open}
					onClose={handleClose}>
					<div style={modalStyle} className={classes.paper}>
						<Grid
							style={{ minHeight: '100px', width: '100%', padding: '25px' }}
							spacing={0}
							lg={12}
							sm={12}
							md={12}
							xs={12}
							container={false}
							item={true}
							form={false}>
							<Typography variant='h6' id='modal-title'>
								{modalData.Info}
							</Typography>
							<Typography
								style={{}}
								variant={'h6'}
								text={'Text'}
								noWrap={false}
								paragraph={false}
								color={'textSecondary'}
								align={'center'}
								gutterBottom={false}
							/>
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* <TextField
									style={{}}
									fullWidth={true}
									placeholder={'Doe'}
									margin={'normal'}
									label={'username'}
									//disabled
									name={'username'}
									color={'primary'}
									InputProps={{
										readOnly: true,
									}}
									multiline={false}
									rows={1}
									rowsMax={1}
									type={'text'}
									variant={'filled'}
									//onChange={event => setValue(event.target.value)}
									{...register('username')}
									value={props.user.username}
								/> */}
								<TextField
									style={{}}
									fullWidth={true}
									helperText={'Enter/Edit your first name'}
									// placeholder={'Doe'}
									margin={'normal'}
									label={'User First Name'}
									name={'firstname'}
									color={'primary'}
									multiline={false}
									rows={1}
									rowsMax={1}
									type={'text'}
									variant={'filled'}
									//////////////////////////////////////////////
									onChange={(e) => setFirstName(e.target.value)}
									//////////////////////////////////////////////
									//onChange={event => setValue(event.target.value)}
									defaultValue={props.user.first_name}
									{...register('firstname')}
								/>
								<TextField
									style={{}}
									fullWidth={true}
									helperText={'Enter/Edit your last name'}
									// placeholder={'Doe'}
									margin={'normal'}
									label={'User Last Name'}
									name={'last_name'}
									color={'primary'}
									multiline={false}
									rows={1}
									rowsMax={1}
									type={'text'}
									variant={'filled'}
									defaultValue={props.user.last_name}
									//////////////////////////////////////////////
									onChange={(e) => setLastName(e.target.value)}
									//////////////////////////////////////////////

									{...register('lastname')}
								/>
								<label htmlFor='contained-button-file'>
									<Input
										accept='image/*'
										id='contained-button-file'
										multiple
										type='file'
										helperText={uploadHelper}
										onChange={(e) => onFileChange(e)}
										// {...register('photo')}
									/>
									<Button
										variant='contained'
										fullWidth
										component='span'
										onClick={() => onFileUpload()}
										color='secondary'>
										Upload Image
									</Button>
									{preview}
									{selectedFile.name}
									{uploadHelper}
								</label>
								{/* <input
									type='file'
									onChange={(e) => onFileChange(e)}
									{...register('picture')}
								/> */}
								{/* <input {...register('picture')} type='file' />{' '} */}

								<Button
									style={{}}
									variant={'contained'}
									color={'secondary'}
									size={'large'}
									text={'Update'}
									fullWidth={true}
									formSubmit={true}
									align={'center'}
									link={''}
									isIcon={false}
									//////////////////////////////////////////////
									//onClick={() => postRequest(B64)}
									//////////////////////////////////////////////

									type='submit'>
									Update Details
								</Button>
							</form>
						</Grid>
						<div></div>
					</div>
				</Modal>
			) : null;
		} else {
			return modalData ? (
				<Alert severity='error'>Please login to update account details!</Alert>
			) : null;
		}
	};

	const handleOpen = (index) => {
		setOpen(true);
		setData(data[index]);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const classes = useStyles();

	return (
		<div>
			{data.map((d, index) => (
				<div>
					<Button
						style={{ marginBottom: '10px' }}
						variant={'contained'}
						color={'secondary'}
						size={'medium'}
						text={'Edit Account Details'}
						fullWidth={true}
						formSubmit={false}
						align={'center'}
						onClick={() => {
							handleOpen(index);
						}}>
						{d.title}
					</Button>

					{/* <Button
        style={{}}
        variant={"contained"}
        color={"primary"}
        size={"medium"}
        text={"Change Profile Picture "}
        fullWidth={true}
        formSubmit={false}
        align={"center"}
        isIcon={false}
        onClick={() => {
          handleOpen(index);
        }}
      >

        Change Profile Picture 
      </Button> */}

					{/* <Button
            onClick={() => {
              handleOpen(index);
            }}
          >
            {d.title}
          </Button> */}
				</div>
			))}
			<CustomModal />
		</div>
	);
}

export default SimpleModal;
