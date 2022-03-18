import React from "react";
import { useParams } from 'react-router-dom'
import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function UserId(Component) {
    return function WrappedComponent(props) {
      const {userId} = useParams();
      return <Component {...props} userId={userId} />;
    }
  }

  class UserProfile extends React.Component {
    state = {
        isLoaded: false,
        user: null,
        posts: [],
        error: null,
    }
    
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.userId}`)
            .then( res => res.json())
            .then(
                (result) => {
                  this.setState({
                    isLoaded: true,
                    user: result
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
            top: "50px",
            padding: '5%'
        }
        const { error, isLoaded, user, posts } = this.state;
      
        if (error) return <div>{error.message}</div>;
        else if (!isLoaded) return <CircularProgress />;
        else {
            return (
                <div style={style}>
                  <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2} direction="column" >
                      <Box display="flex" justifyContent="flex-end">
                       <Grid item xs ='auto'>
                          <Typography gutterBottom variant='h5' component="div" textAlign='center'>
                            {user.username}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Grid item xs ='auto' spacing={2}>
                          <Typography gutterBottom variant='h5' component="div" textAlign='center'>
                            {user.first_name} {user.last_name}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </Box>
                </div>
            );
        }
    }

}

export default UserId(UserProfile);