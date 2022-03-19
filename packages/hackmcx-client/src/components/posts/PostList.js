import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import Post from './Post';

class PostList extends React.Component {
	state = {
		isLoaded: false,
		posts: [],
		error: null,
	};

	componentDidMount() {
		fetch(`${process.env.REACT_APP_API_URL}/api/v1/posts`)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						posts: result,
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	render() {
		const style = {
			position: 'relative',
			top: '50px',
		};
		const { error, isLoaded, posts, value, setValue } = this.state;

		if (error) return <div>{error.message}</div>;
		else if (!isLoaded) return <CircularProgress />;
		else {
			return (
				<div style={style}>
					<Container>
						{posts.map((post) => (
							<Post post={post} />
						))}
						;
					</Container>
				</div>
			);
		}
	}
}

export default PostList;
