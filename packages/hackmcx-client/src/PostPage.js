import React from 'react';
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';


class PostPage extends React.Component {
  state = {
    isLoaded: false,
    posts: [],
    error: null
  }
  

  componentDidMount() {
    fetch("http://localhost:3003/api/v1/posts")
    .then( res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          posts: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }


  render() {
    const style = {
      position: "relative",
      top: "50px"
    }
    const { error, isLoaded, posts } = this.state;

    if (error) return <div>{error.message}</div>;
    else if (!isLoaded) return <CircularProgress />;
    else {
      return (
        <div style = {style}>
          <h1>Warai</h1>
          <Container>
          {posts.map(post => (   
            <Grid 
              container 
              spacing={5} 
              justifyContent="center"
              alignItems="center"
            >
              <Grid item /*Post Component */>
                <Card height='100%' display='flex' flexDirection='column' sx={{width: '535px', margin: '15px'}}>
                  <a href={post.id}>
                    <CardMedia
                      component="img"
                      paddingTop='56.25%'
                      image={post.imageUrl}  
                      alt={post.title}/>
                  </a>
                  <CardContent flexGrow='1'>
                    <Typography gutterBottom variant='h5' component="div">
                      {post.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))};
          </Container>
        </div>
      );
    }
  }
}

export default PostPage;
