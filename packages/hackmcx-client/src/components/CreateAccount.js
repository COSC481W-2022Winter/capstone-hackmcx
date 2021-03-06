import React from "react";
import { Avatar, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const CreateAccount = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			alignSelf: "center",
			justifyContent: "center",
			alignItems: "center",
			display: "flex",
			"& > *": {
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
	}));

	const nav = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [usernameHelper, setUsernameHelper] = useState(
		"Username cannot be empty."
	);
	const [passwordHelper, setPasswordHelper] = useState(
		"Password cannot be empty."
	);
	const [firstnameHelper, setFirstnameHelper] = useState(
		"First name cannot be empty."
	);
	const [lastnameHelper, setLastnameHelper] = useState(
		"Last name cannot be empty."
	);
	const [repasswordHelper, setRepasswordHelper] = useState(
		"Password cannot be empty"
	);
	const [passwordError, setPasswordError] = useState(true);
	const [usernameError, setUsernameError] = useState(true);
	const [firstnameError, setFirstnameError] = useState(true);
	const [lastnameError, setLastnameError] = useState(true);
	const [repasswordError, setRepasswordError] = useState(true);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/v1/users`,
			requestOptions
		);
		const jsonData = await response.json();

		if (jsonData.token == null || jsonData.token == "") {
			//console.log("no response");
			alert(jsonData.error);
		} else {
			alert("login success, redirecting...");
			 console.log(jsonData.token);
			// // authObject.token = jsonData.token;
			// // authObject.expires = Date.now() + 9000;
			// localStorage.setItem('authToken', jsonData.token);
			// localStorage.setItem('tokenExpires', Date.now() + 2.5 * 60 * 60 * 1000); //2.5hrs
			// localStorage.setItem('username', data.username);
			// // navigate('/');
			// window.location.href = '/';

			// Object.freeze(authObject);
			//localStorage.setItem("authToken",JSON.stringify(jsonData.token));
		}
	};

	function postRequest() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
				username: username,
				password: password,
				firstname: firstname,
				lastname: lastname,
			})
			.then(
				(response) => {
					console.log(response);
					setUsernameError(false);
					setPasswordError(false);
					setFirstnameError(false);
					setLastnameError(false);
					setRepasswordError(false);
					alert("Account created successfully, redirecting to login...");
					window.location.href = '/login';
				},
				(error) => {
					console.log(error);
					alert(error.response.data.error);
				}
			);
	}

	function validationUsername(val) {
		if (!val || val === "" || /^\s*$/.test(val)) {
			setUsernameError(true);
			setUsernameHelper("Username cannot be empty.");
		} else if (/\s/.test(val)) {
			setUsernameError(true);
			setUsernameHelper("Username cannot contain spaces.");
		} else {
			setUsername(val);
			setUsernameError(false);
			setUsernameHelper("");
		}
	}

	function validationFirstname(val) {
		if (!val || val === "" || /^\s*$/.test(val)) {
			setFirstnameError(true);
			setFirstnameHelper("First name cannot be empty.");
		} else {
			setFirstname(val);
			setFirstnameError(false);
			setFirstnameHelper("");
		}
	}

	function validationLastname(val) {
		if (!val || val === "" || /^\s*$/.test(val)) {
			setLastnameError(true);
			setLastnameHelper("Last name cannot be empty.");
		} else {
			setLastname(val);
			setLastnameError(false);
			setLastnameHelper("");
		}
	}

	function validationPassword(val) {
		if (!val || val === "") {
			setPasswordError(true);
			setPasswordHelper("Password cannot be empty.");
		} else if (/\s/.test(val)) {
			setPasswordError(true);
			setPasswordHelper("Password cannot contain spaces.");
		} else if (
			/^[0-9]*$/.test(val) ||
			/^[a-zA-Z]*$/.test(val) ||
			val.length < 8
		) {
			setPasswordError(true);
			setPasswordHelper("Password is not strong enough.");
		} else {
			setPassword(val);
			setPasswordError(false);
			setPasswordHelper("");
		}
	}

	function validationRePassword(val) {
		if (!val || val === "") {
			setRepasswordError(true);
			setRepasswordHelper("Password cannot be empty.");
		} else if (val != password) {
			setRepasswordError(true);
			setRepasswordHelper("Passwords must match");
		} else {
			setRepasswordError(false);
			setRepasswordHelper("");
		}
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
				container={true}
				item={false}
				form={false}
			>
				<form>

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
								error={firstnameError}
								fullWidth
								variant="filled"
								color="primary"
								type="string"
								label="First Name"
								onChange={(e) => validationFirstname(e.target.value)}
								helperText={firstnameHelper}
							/>
						</Grid>

						<Grid item paddingY={1}>
							<TextField
								error={lastnameError}
								fullWidth
								variant="filled"
								color="primary"
								type="string"
								label="Last Name"
								onChange={(e) => validationLastname(e.target.value)}
								helperText={lastnameHelper}
							/>
						</Grid>

						<Grid item paddingY={1}>
							<TextField
								error={usernameError}
								fullWidth
								variant="filled"
								color="primary"
								type="string"
								label="Username"
								{...register("username", {
									onChange: (e) => validationUsername(e.target.value),
								})}
								helperText={usernameHelper}
							/>
						</Grid>

						<Grid item paddingY={1}>
							<TextField
								error={passwordError}
								fullWidth
								variant="filled"
								color="primary"
								label="Password"
								type="password"
								{...register("password", {
									onChange: (e) => validationPassword(e.target.value),
								})}
								helperText={passwordHelper}
							/>
						</Grid>

						<Grid item paddingY={1}>
							<TextField
								error={repasswordError}
								fullWidth
								variant="filled"
								color="primary"
								type="password"

								label="Re-Type Password"
								onChange={(e) => validationRePassword(e.target.value)}
								helperText={repasswordHelper}
							/>
						</Grid>

						<Grid item paddingY={1}>
							<Button
								fullWidth
								size="medium"
								variant="contained"
								color="primary"
								disabled={
									usernameError ||
									passwordError ||
									firstnameError ||
									lastnameError ||
									repasswordError
								}
								onClick={() => postRequest()}
							>
								Create Account
							</Button>
						</Grid>
					</div>
				</form>
			</Grid>
		</div>
	);
};
export default CreateAccount;
