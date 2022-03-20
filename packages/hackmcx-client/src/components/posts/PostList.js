import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, CircularProgress, Grid, Link} from '@mui/material';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';

export default function PostList(){
	const [posts, setPosts] = useState({})
	const [isLoaded, setIsLoaded] = useState(false)
	const nav = useNavigate();

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts`)
			.then((result) => {
				setPosts(result.data)
				setIsLoaded(true)
			})
			.catch((error) => {
				setIsLoaded(true)
			})
	}, [])

	if (!isLoaded){
		return (<Grid container><Grid item><CircularProgress /></Grid></Grid>)
	} else{
		return (
			<Grid container spacing={5} >
				{
					posts.map((post) => {
						return (
							<Grid item key={post.id} xs={12}>
								<Card
									sx={{padding: 2}}
									onClick={() => nav(`/posts/${post.id}`)}
								>
									<CardMedia
										component='img'
										image={post.imageUrl}
										alt={post.title}
										title={post.title}
									/>
									<CardContent>
										<Typography
											gutterBottom
											variant={"body1"}
											component={"div"}
											align={"center"}
											noWrap={false}
										>
											{post.caption}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						)
					})
				}
			</Grid>
		)
	}
}

