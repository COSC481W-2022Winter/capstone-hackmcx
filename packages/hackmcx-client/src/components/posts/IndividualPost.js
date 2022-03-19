import * as React from 'react';
import {
	Container,
	Card,
	Grid,
	Typography,
	CardMedia,
	CardContent,
	CircularProgress,
	Button,
	Rating,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import CreateCaption from './captions/CaptionCreation'; //added

const labels = {
	0.5: '💩',
	1: '💩+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

function getPostId(Component) {
	return function WrappedComponent(props) {
		const { postId } = useParams();
		return <Component {...props} postId={postId} />;
	};
}

class IndividualPost extends React.Component {
	state = {
		isLoaded: false,
		post: null,
		captions: [],
		error: null,
		captionsError: '',
		value: '',
		rated: false,
		showCreateComponent: false,
		hover: -1,
	};

	setValue(newValue) {
		this.setState({
			value: newValue,
		});
	}

	setHover(newHover) {
		this.setState({
			hover: newHover,
		});
	}

	setRated(newRated) {
		this.setState({
			rated: newRated,
		});
	}

	setShowCreateComponent() {
		this.setState({
			showCreateComponent: !this.state.showCreateComponent,
		});
		//alert(this.props.postId)
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_API_URL}/api/v1/posts/${this.props.postId}`)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						post: result,
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
		fetch(
			`${process.env.REACT_APP_API_URL}/api/v1/posts/${this.props.postId}/captions`
		).then((res) => {
			if (res.status === 404) {
				this.state.captionsError = 'No captions on this post';
			} else {
				res.json().then(
					(result) => {
						if (result === null) {
							alert('null result');
						} else {
							this.setState({
								isLoaded: true,
								captions: result,
							});
						}
					},
					(error) => {
						this.setState({
							isLoaded: true,
							error,
						});
					}
				);
			}
		});
	}

	submitRating = (postId, captionId, average_rating) => {
		this.setRated(true);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/captions/${captionId}/_rate`,
				{ rating: average_rating }
			)
			.then(
				(response) => {
					alert('Caption rated!');
					console.log(response);
				},
				(error) => {
					alert('Caption could not be rated!');
					console.log(error);
				}
			);
	};

	render() {
		const style = {
			position: 'relative',
			top: '50px',
		};
		const { error, isLoaded, post, captions, captionsError } = this.state;

		if (error) return <div>{error.message}</div>;
		else if (!isLoaded) return <CircularProgress />;
		else {
			return (
				<div style={style}>
					<Container>
						<Grid
							container
							spacing={5}
							alignItems='center'
							justifyContent={'center'}>
							<Grid
								container
								spacing={5}
								justifyContent='center'
								alignItems='center'>
								<Grid item xs={4} /*Post Component */>
									<Card height='100%' display='flex' flexDirection='column'>
										<a href={'/individualPost/' + post.id}>
											<CardMedia
												component='img'
												paddingTop='56.25%'
												image={post.imageUrl}
												alt={post.title}
											/>
										</a>
										<CardContent flexGrow='1'>
											<Typography
												gutterBottom
												variant='h5'
												component='div'
												textAlign='center'>
												{post.title}
											</Typography>
											<Button
												onClick={() => this.setShowCreateComponent()}
												variant='contained'
												color='primary'
												sx={{ mt: 2 }}>
												Create Caption
											</Button>
											{this.state.showCreateComponent && <CreateCaption />}
										</CardContent>
									</Card>
								</Grid>
							</Grid>
							{captions.map((caption) => (
								<Grid
									container
									spacing={4}
									justifyContent='center'
									alignItems='center'>
									<Grid item xs={2} alignContent='center'>
										<Typography variant='h5' gutterBottom>
											{caption.caption} {caption.average_rating}
											<Box
												sx={{
													width: 200,
													display: 'flex',
													alignItems: 'center',
												}}>
												<Rating
													name='hover-feedback'
													value={caption.average_rating}
													precision={0.5}
													onChange={(event, newValue) => {
														this.setValue(newValue);
													}}
													onChangeActive={(event, newHover) => {
														this.setHover(newHover);
													}}
													onClick={() =>
														!this.state.rated &&
														this.submitRating(
															this.props.postId,
															caption.id,
															caption.average_rating
														)
													}
													emptyIcon={
														<StarIcon
															style={{ opacity: 0.55 }}
															fontSize='inherit'
														/>
													}
												/>
												{this.state.value !== null && (
													<Box sx={{ ml: 2 }}>
														{
															labels[
																this.state.hover !== -1
																	? this.state.hover
																	: this.state.value
															]
														}
													</Box>
												)}
											</Box>
										</Typography>
									</Grid>
								</Grid>
							))}
							<Grid item>
								<Typography
									variant='h4'
									xs={5}
									flexGrow={1}
									textAlign='center'
									style={{ color: 'grey' }}>
									{captionsError}
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</div>
			);
		}
	}
}

export default getPostId(IndividualPost);

