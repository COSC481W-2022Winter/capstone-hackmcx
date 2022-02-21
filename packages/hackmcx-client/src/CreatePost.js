import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { useState } from 'react';

const CreatePost = () => {
	const [myTitle, setmyTItle] = useState('');
	const [myImageurl, setmyImageurl] = useState('');

	//When the create post button is clicked, this function will be called.
	function postRequest() {
		axios
			.post('http://localhost:3003/api/v1/posts', {
				title: myTitle,
				imageUrl: myImageurl,
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
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<br />
				<br />
				<br />
				<br />
				<Grid xs={8} item md={4}>
					<LinkIcon />
					<TextField
						variant='filled'
						color='primary'
						type='url'
						label='URL'
						onChange={(e) => setmyImageurl(e.target.value)}></TextField>
				</Grid>
				<Grid xs={8} md={4}>
					<ImageIcon />
					<TextField
						variant='filled'
						color='secondary'
						type='title'
						label='Post Name'
						onChange={(e) => setmyTItle(e.target.value)}></TextField>
				</Grid>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<Grid item xs={6} md={12}>
					<Button
						size='medium'
						variant='contained'
						color='secondary'
						onClick={() => postRequest()}>
						Create Post
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default CreatePost;
