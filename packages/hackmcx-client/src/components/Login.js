import React from "react";
import { Avatar, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import authObject from './authToken'
import { useNavigate } from "react-router-dom";



const Login = () =>  {

  const navigate = useNavigate();



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
      }

    }));

	const [usernameHelper, setUsernameHelper] = useState("Username cannot be empty.");
	const [passwordHelper, setPasswordHelper] = useState("Password cannot be empty.");
	const [passwordError, setPasswordError] = useState(true);
	const [usernameError, setUsernameError] = useState(true);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
//  const onSubmit = data => console.log(data);

const onSubmit = async (data) => {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/_login`, requestOptions);
  const jsonData = await response.json();

  if((jsonData.token)==null||(jsonData.token)==""){
    //console.log("no response");
    alert(jsonData.error);
  }else{
 
      alert("login success, redirecting...")
      console.log(jsonData.token);
       authObject.token=jsonData.token;
       authObject.expires=Date.now()+9000;
       localStorage.setItem("authToken",(jsonData.token));
       localStorage.setItem("tokenExpires",Date.now()+(2.5*60*60*1000)); //2.5hrs
       navigate("/");
    

    // Object.freeze(authObject);
    //localStorage.setItem("authToken",JSON.stringify(jsonData.token));
    
  }
}

  
	function validationUsername(val) {
		if (!val || val === '' || /^\s*$/.test(val)) {
			setUsernameError(true);
			setUsernameHelper("Username cannot be empty.")
		}
    else if (/\s/.test(val)) {
      setUsernameError(true);
			setUsernameHelper("Username cannot contain spaces.")
        }
		else{
			setUsernameError(false);
			setUsernameHelper("")
		} 
	}

	function validationPassword(val) {
		if (!val || val === '') {
			setPasswordError(true);
			setPasswordHelper("Password cannot be empty.")
		} 
    else if (/\s/.test(val)) {
      setPasswordError(true);
			setPasswordHelper("Password cannot contain spaces.")
    }
		else if (/^[0-9]*$/.test(val) || /^[a-zA-Z]*$/.test(val) || val.length < 8) {
			setPasswordError(true);
			setPasswordHelper("Password is not strong enough.")
		}
		else{
			setPasswordError(false);
			setPasswordHelper("")
		}
	}

    if(localStorage.getItem("authToken")!=null && localStorage.getItem("tokenExpires")>Date.now()){
    
      navigate("/");
      window.location.href = "/";

    }
  
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
      flexWrap: "wrap",
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

  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={useStyles.root}>
      <Grid item padding={2}>
        <Avatar
          src={"/imgs/logo.png"}
          className={useStyles.large}
          style={{
            margin: "10px",
            width: "150px",
            minHeight: "150px",
            "border-radius": "20px",
          }}
        />
      </Grid>
      <Grid item paddingY={1}>
        <TextField
          fullWidth
          variant="filled"
          color="primary"
          type="text"
          label="username"
          name="username"
          required
          autoFocus
          helperText={usernameHelper}
          {...register("username", { onChange: (e) => validationUsername(e.target.value) }  )}
        />
      </Grid>

      <Grid item paddingY={1}>
        <TextField
          fullWidth
          variant="filled"
          color="primary"
          type="password"
          label="password"
          name="password"
          required
          helperText={passwordHelper}
          {...register("password", { onChange: (e) => validationPassword(e.target.value) })}

        />
      </Grid>

      <Grid item paddingY={1}>
        <Button
      style={{}}
      disabled={usernameError || passwordError}
      variant={"contained"}
      color="primary"
      size={"large"}
      text={"Update"}
      fullWidth={true}
      formSubmit={true}
      align={"center"}
      link={""}
      isIcon={false}
      type="submit"
    >
      LOGIN
    </Button>

      </Grid>
    </div>
    </form>
  </Grid>
</div>
    );
}  
export default Login;