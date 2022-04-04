import React, { useEffect, useState } from 'react';
import {
	Card,
	CardMedia,
	CircularProgress,
	Grid,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateCaption from './captions/CaptionCreation';
import CaptionRating from './captions/Ratings';
import ErrorPage from '../ErrorPage';

export default function Post(props) {
	const [post, setPost] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	let { postId } = useParams();
	let visibility = null;

	if (
		localStorage.getItem('authToken') != null &&
		localStorage.getItem('tokenExpires') > Date.now()
	) {
		visibility = true;
	} else {
		visibility = false;
	}
	const token = 'myToken';
	let header = {
		headers: { Authorization: 'Bearer ' + token },
	};

	const fetchPost = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`)
			.then((result) => {
				setPost(result.data);
				setIsLoaded(true);
			})
			.catch((error) => {
				setIsLoaded(true);
			});
	};

	useEffect(() => {
		fetchPost();
	}, []);
	if (!isLoaded) {
		return (
			<Grid container>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		);
	}
	if (
		post &&
		Object.keys(post).length === 0 &&
		Object.getPrototypeOf(post) === Object.prototype
	) {
		return <ErrorPage />;
	}
	if (!post.hasOwnProperty('captions')) {
		return (
			<Grid container spacing={5} justifyContent='center' alignItems='center'>
				<Grid item xs={12}>
					<Card sx={{ padding: 2 }}>
						<CardMedia component='img' image={post.imageUrl} alt={post.title} />
					</Card>
				</Grid>
				<Grid item xs={12} justifyContent={'center'}>
					<CreateCaption postId={postId} callback={fetchPost} />
				</Grid>
			</Grid>
		);
	} else {
		return (
			<Grid container spacing={5} justifyContent='center' alignItems='center'>
				<Grid item xs={12}>
					<Card sx={{ padding: 2 }}>
						<CardMedia component='img' image={post.imageUrl} alt={post.title} />
					</Card>
				</Grid>
				<Grid item xs={12} justifyContent={'center'}>
					{visibility == true && (
						<CreateCaption postId={postId} callback={fetchPost} />
					)}{' '}
				</Grid>
				{post.captions.map((caption) => {
					return (
						<React.Fragment>
							<Grid item xs={10}>
								<Typography
									gutterBottom
									variant={'body1'}
									component={'div'}
									align={'left'}
									noWrap={false}>
									{caption.caption}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<CaptionRating
									postId={postId}
									captionId={caption.id}
									average_rating={caption.average_rating}
									callback={fetchPost}
								/>
							</Grid>
						</React.Fragment>
					);
				})}
			</Grid>
		);
	}
}
