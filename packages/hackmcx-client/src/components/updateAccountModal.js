import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


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
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter/Edit your first name"}
      placeholder={"Doe"}
      margin={"normal"}
      label={"User First Name"}
      name={"User First Name"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      value={props.user.first_name}
    />
    <TextField
      style={{}}
      fullWidth={true}
      helperText={"Enter/Edit your last name"}
      placeholder={"Doe"}
      margin={"normal"}
      label={"User Last Name"}
      name={"User Last Name"}
      color={"primary"}
      multiline={false}
      rows={1}
      rowsMax={1}
      type={"text"}
      variant={"filled"}
      value={props.user.last_name}
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
    >
      Update Details
    </Button>
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
