import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export default function CreateCaption({ postId, callback }) {
	const [submitted, setSubmitted] = useState(false);
	const [caption, setCaption] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const token = 'myToken';
	let header = {
		headers: { Authorization: 'Bearer ' + token },
	};

	const submit = () => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/captions`,
				{ caption: caption },
				header
			)
			.then(
				(response) => {
					console.log(response);
					setSubmitted(true);
					callback();
				},
				(error) => {
					alert('Caption could not be created!');
					console.log(error);
				}
			);
	};

	return (
		<Grid container direction='row' spacing={3}>
			<Grid item xs={10}>
				<TextField
					fullWidth
					variant='filled'
					color='primary'
					type='url'
					label='Type your caption here'
					onChange={(e) => setCaption(e.target.value)}
				/>
			</Grid>
			<Grid item xs={2}>
				<Button
					disabled={submitted}
					size='medium'
					variant='contained'
					color='secondary'
					onClick={() => submit()}>
					Post Caption
				</Button>
			</Grid>
		</Grid>
	);
}
