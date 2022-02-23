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
	const style = {
		position: "relative",
		top: "200px"
	}
		
	return (
		<div style={style}>
			<Grid 
				container
				justifyContent="center"
					alignItems="center"
				spacing = {3}
			>
				<Grid item xs={8}>
					<LinkIcon />
					<TextField
						variant='filled'
						color='primary'
						type='url'
						label='URL'
						onChange={(e) => setmyImageurl(e.target.value)}></TextField>
				</Grid>
				<Grid item xs={8}>
					<ImageIcon />
					<TextField
						variant='filled'
						color='secondary'
						type='title'
						label='Post Name'
						onChange={(e) => setmyTItle(e.target.value)}></TextField>
				</Grid>
				<Grid item xs={6}>
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
