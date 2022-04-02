import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

function SimpleModal(props) {
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [modalData, setData] = useState();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
//const onSubmit = data => console.log(data);
const onSubmit = async (data) => {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      "Authorization": "Bearer "+ localStorage.getItem("authToken")+""},
      body: JSON.stringify(data)
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${props.user.username}`, requestOptions);
  const jsonData = await response.status;

  console.log(jsonData);
  window.location.href=window.location.href
  navigate(`/user/${props.user.username}`);
}


  const data = [
    {
      title: "Update Account Information",
      Info: "Update Account Information"
    },
  ];
  const CustomModal = () => {
    return modalData ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          
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
     <Typography variant="h6" id="modal-title">
            {modalData.Info}
          </Typography>
    <Typography
      style={{}}
      variant={"h6"}
      text={"Text"}
      noWrap={false}
      paragraph={false}
      color={"textSecondary"}
      align={"center"}
      gutterBottom={false}
    />
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      style={{}}
      fullWidth={true}
      placeholder={"Doe"}
      margin={"normal"}
      label={"username"}
      //disabled
      name={"username"}
      color={"primary"}
      InputProps={{
        readOnly: true,
      }}

      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      //onChange={event => setValue(event.target.value)}
      {...register("username")}
      value={props.user.username}

    />
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter/Edit your first name"}
      placeholder={"Doe"}
      margin={"normal"}
      label={"User First Name"}
      name={"firstname"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      //onChange={event => setValue(event.target.value)}
      defaultValue={props.user.first_name}
      {...register("firstname")}


    />
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter/Edit your last name"}
      placeholder={"Doe"}
      margin={"normal"}
      label={"User Last Name"}
      name={"last_name"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      defaultValue={props.user.last_name}
      {...register("lastname")}

    />
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter/Edit the link to your profile picture"}
      placeholder={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MJd1-.svg/100px-MJd1-.svg.png"}
      margin={"normal"}
      label={"Profile Picture URL"}
      name={"imageUrl"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      defaultValue={props.user.imageUrl}
      {...register("imageUrl")}

    />
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter new password"}
      placeholder={"Doe"}
      margin={"normal"}
      label={"password"}
      name={"password"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"password"}
      variant={"filled"}
      //value={props.user.last_name}
      //onChange={handleInputChanged(props.user.imageUrl)}
      required
      {...register("password")}

    />
    <Button
      style={{}}
      variant={"contained"}
      color={"primary"}
      size={"large"}
      text={"Update"}
      fullWidth={true}
      formSubmit={true}
      align={"center"}
      link={""}
      isIcon={false}
      type="submit"
    >
      Update Details
    </Button>
    </form>
  </Grid>          
          <div>
        </div>

        </div>
      </Modal>
    ) : null;
  };

  const handleOpen = index => {
    setOpen(true);
    setData(data[index]);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      {data.map((d, index) => (
        <div>
          <Button
        style={{ marginBottom: "10px" }}
        variant={"contained"}
         color={"primary"}
        size={"medium"}
        text={"Edit Account Details"}
        fullWidth={true}
        formSubmit={false}
        align={"center"}
        onClick={() => {
          handleOpen(index);
        }}
      >
        {d.title}
      </Button>

      {/* <Button
        style={{}}
        variant={"contained"}
        color={"primary"}
        size={"medium"}
        text={"Change Profile Picture "}
        fullWidth={true}
        formSubmit={false}
        align={"center"}
        isIcon={false}
        onClick={() => {
          handleOpen(index);
        }}
      >
        Change Profile Picture 
      </Button> */}

          {/* <Button
            onClick={() => {
              handleOpen(index);
            }}
          >
            {d.title}
          </Button> */}
        </div>
      ))}
      <CustomModal />
    </div>
  );
}

export default SimpleModal;
