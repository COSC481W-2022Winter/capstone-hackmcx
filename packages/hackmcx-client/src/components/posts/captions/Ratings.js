import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useState } from 'react';
import LoginMockUp from '../../LoginMockUp';
import { useNavigate } from 'react-router-dom';

export default function CaptionRating({
	postId,
	captionId,
	average_rating,
	callback,
}) {
	const [rated, setRated] = useState(false);

	const nav = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const token = 'myToken';
	let header = {
		headers: { Authorization: 'Bearer ' + token },
	};

	const submitRating = (value) => {
		setRated(true);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/captions/${captionId}/_rate`,
				{ rating: value / 5 }
			)
			.then(
				(response) => {
					console.log(response);
					callback();
				},
				(error) => {
					if (error == 'Error: Request failed with status code 401') {
						alert('Unauthorized action, redirecting you to the Log in Page');
						nav(`/login/user`);
					} else {
						alert('Caption could not be rated!');
					}
				}
			);
	};

	return (
		<Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
			{isLoggedIn === false && (
				<Rating
					name='caption-rating'
					precision={0.5}
					value={average_rating * 5}
					onChange={(event, newValue) => {
						!rated && submitRating(newValue);
					}}
					disabled
					emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
				/>
			)}
			{isLoggedIn === true && (
				<Rating
					name='caption-rating'
					precision={0.5}
					value={average_rating * 5}
					onChange={(event, newValue) => {
						!rated && submitRating(newValue);
					}}
					emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
				/>
			)}
		</Box>
	);
}
