import React from 'react';
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';


class PostList extends React.Component {
  state = {
    isLoaded: false,
    posts: [],
    error: null
  }


  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/posts`)
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
                        <a href={'individualPost/' + post.id}>
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

export default PostList;