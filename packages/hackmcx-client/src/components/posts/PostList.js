import React from 'react';
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Post from './Post';


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
    const { error, isLoaded, posts,value, setValue } = this.state;

    if (error) return <div>{error.message}</div>;
    else if (!isLoaded) return <CircularProgress />;
    else {
      return (
        
          <div style = {style}>
            <Container>
              {posts.map(post => (
                <Post 
                post={post}
                />
      //             <Grid
      //                 container
      //                 spacing={5}
      //                 justifyContent="center"
      //                 alignItems="center"
      //             >



      //               <Grid item /*Post Component */>
      //                 <Card height='100%' display='flex' flexDirection='column' sx={{width: '535px', margin: '15px'}}>
      //                   <a href={'individualPost/' + post.id}>
                        
      //                   <CardMedia
      //                         component="img"
      //                         paddingTop='56.25%'
      //                         image={post.imageUrl}
      //                         alt={post.title}/>
      //                   </a>
      //                   <CardContent flexGrow='1'>
      //                     <Typography  style={{}}
      // variant={"h3"}
      // text={"Text"}
      // noWrap={false}
      // paragraph={false}
      // color={"initial"}
      // align={"center"}
      // gutterBottom={false}>
      //                       {post.title}

      //                       <div>
      //                       <Typography  style={{}} variant={"h6"} text={"Text"} noWrap={false} paragraph={false} color={"initial"} align={"center"} gutterBottom={false}>
      //                       <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
      //                       </Typography>
      //                       </div>
                            
      //                     </Typography>
                          
      //                   </CardContent>

      //                 </Card>
      //               </Grid>
      //             </Grid>





              ))};
            </Container>
          </div>
      );
    }
  }
}

export default PostList;