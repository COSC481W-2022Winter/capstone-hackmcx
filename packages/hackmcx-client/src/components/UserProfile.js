import React from "react";
import { useParams } from 'react-router-dom'
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Demo from './updateAccountModal';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ErrorPage from './ErrorPage';




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
        searchQuery: ""
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
            top: "50px"
        }
        
        const { error, isLoaded, user, posts } = this.state;

        const useStyles = makeStyles((theme) => ({
          root: {
            alignSelf: 'center',
            justifyContent: "center",
            alignItems: "center",
            display: 'flex',
            '& > *': {
              margin: theme.spacing(1),
            },
          },
          input: {
            display: "none",
          },
          large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
          },
          overlay:{
            position: "absolute",
            width: "100%",
            opacity: 0.8,
            height:"50%",
            top:"50%",
            transition: ".3s ease",
            background: "red",
          }

        }));
        


        
        if (error) return <ErrorPage />;
        else if (!isLoaded) return <CircularProgress />;
        else {
            return (
             
                <div>
                   
                    <Grid
    style={{
      minHeight: "100px",
      width: "100%",
      padding: "25px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap"
    }}
    spacing={0}
    lg={12}
    sm={12}
    md={6}
    xs={6}
    container={true}
    item={false}
    form={false}
  >
  

<div className={useStyles.root}>

  <IconButton color="primary" aria-label="upload picture" component="span" 
  style={{ "border-radius":"20px",background:"rgb(160 3 24)"}}
  // style={{background:"#a00318ad"}}
  >
    <Avatar src={user.imageUrl} className={useStyles.large} style={{
      margin: "10px",
      width: "150px",
        minHeight: "150px",
        "border-radius":"20px"
     }} />
  </IconButton>
  {/* <Typography variant="p" gutterBottom component="div"  style={{ "position": "relative", background:"rgb(160 3 24 / 64%)",marginTop: "-70px", "z-index":200, "text-align":"center", color:"white", "paddingBottom":"15px"}}>
    Change Image <br /> using update account
      </Typography> */}
</div>

    <Typography variant="h6" gutterBottom component="div"  style={{ marginTop: "20px" }}>
    username : {user.username} 
      </Typography>

    <Typography variant="h4" gutterBottom component="div"  style={{ marginTop: "10px" }}>
    {user.first_name} {user.last_name}  
      </Typography>
    <Grid
      style={{ minHeight: "100px", width: "100%", padding: "25px" }}
      spacing={0}
      lg={12}
      sm={12}
      md={12}
      xs={12}
      container={false}
      item={true}
      form={false}
    >

      <Demo user={user}/>
     
    </Grid>
  </Grid>


                    
                </div>
                 
            );
        }
    }

}



export default UserId(UserProfile);