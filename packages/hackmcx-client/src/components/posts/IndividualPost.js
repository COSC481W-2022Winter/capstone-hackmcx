import React from 'react'
import { Container, Card, Grid, Typography, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

function getPostId(Component) {
  return function WrappedComponent(props) {
    const {postId} = useParams();
    return <Component {...props} postId={postId} />;
  }
}

class IndividualPost extends React.Component {

  state = {
    isLoaded: false,
    post: null,
    captions: [],
    error: null,
    captionsError: ''
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/posts/${this.props.postId}`)
        .then( res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                post: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/posts/${this.props.postId}/captions`)
      .then( res => {
        if (res.status === 404) {
          this.state.captionsError = 'No captions on this post'
        } else {
          res.json()
          .then(
            (result) => {
              if(result === null) {
                alert("null result")
              } else {
                this.setState({
                  isLoaded: true,
                  captions: result
               });
              }
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
        }
      }) 
  }

  render() {
    const style = {
      position: "relative",
      top: "50px"
    }
    const { error, isLoaded, post, captions, captionsError } = this.state;

    if (error) return <div>{error.message}</div>;
    else if (!isLoaded) return <CircularProgress />;
    else {
      return (
          <div style = {style}>
            <Container>
              <Grid container>
                  <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item xs={4} /*Post Component */>
                      <Card height='100%' display='flex' flexDirection='column'>
                        <a href={'/individualPost/' + post.id}>
                          <CardMedia
                              component="img"
                              paddingTop='56.25%'
                              image={post.imageUrl}
                              alt={post.title}/>
                        </a>
                        <CardContent flexGrow='1'>
                          <Typography gutterBottom variant='h5' component="div" textAlign='center'>
                            {post.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  {captions.map((caption) => (
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                      <Grid item xs={2} alignContent="center" /*Captions*/>
                        <Typography variant='h5' gutterBottom>
                          {caption.caption} {caption.average_rating}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid container>
                    <Typography variant='h6' xs={5} flexGrow={1} textAlign='center'>
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