import TextField from '@material-ui/core/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { useState } from 'react';

const CreatePost = () => {
	// const [example, setExample] = useState('-_-');
	// useEffect(async () => {
	// 	await axios
	// 		.get('http://localhost:3003/api/vi/posts')
	// 		.then((response) => {
	// 			setExample(response.data[0].CURRENT_TIMESTAMP);
	// 		})
	// 		.catch((asny) => console.log(any));
	// }, [example]);

	const [state, setState] = useState(null);

	const [myTitle, setmyTItle] = useState('');
	const [myImageurl, setmyImageurl] = useState('');

	function postRequest() {
		const createPostText = { title: myTitle, imageUrl: myImageurl };
		axios
			.post('http://localhost:3003/api/v1/posts', createPostText)
			.then((response) => this.setState(response.data[0].id))
			.catch((error) => {
				this.setState({ errorMessage: error.message });
				console.error('There was an error!', error);
			});
	}

	// componentDidMount() {
	// 	// POST request using axios with error handling
	// 	const article = { title: 'React POST Request Example' };
	// 	axios.post('https://reqres.in/invalid-url', article)
	// 		.then(response => this.setState({ articleId: response.data.id }))
	// 		.catch(error => {
	// 			this.setState({ errorMessage: error.message });
	// 			console.error('There was an error!', error);
	// 		});
	// }

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
			<p>State:{state}</p>
		</div>
	);
};

export default CreatePost;
