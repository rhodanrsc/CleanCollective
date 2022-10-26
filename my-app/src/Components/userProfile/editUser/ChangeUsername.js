import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import Slide from '@mui/material/Slide';
import { ReactSession }  from 'react-client-session';

//Handles slide up animation of dialog boxes
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeUsername() {
  let userSession = ReactSession.get("userSession")
  const [open, setOpen] = useState(false);
  const [newUsername, setUsername] = useState("");
  const [error, setMessage] = useState({
    color: "",
    text: ""
  }); 

  //Handles filling/unfilling of buttons
  const [buttonColor, setButton] = useState("outlined")
  const handleFillButton = (event) => {
    setButton("contained");
  }

  const handleEmptyButton = (event) => {
    setButton("outlined");
  }

  //Handles opening/closing of Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    hideMessage();
    resetUsername();
  };

  /*
  Handles Error Messages
  emptyError : If the string/input is submitted empty.
  existError : The username already exists in database.
  success : If all validation passes.
  */
  const showMessage = (event) => {
    if(event === "emptyError"){
      setMessage({
        color: "red",
        text : "*Username cannot be blank"
      });
    } else if(event === "existError"){
      setMessage({
        color: "red",
        text : "*Username already in use"
      });
    } else {
      setMessage({
        color: "",
        text : "Username succesfully changed!"
      });
    }
  };
  const hideMessage = () => {
    setMessage("");
  };

  //Handles username input
  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };
  const resetUsername = () => {
    setUsername("");
  }

  const onSubmit = () => {
    if(userSession){
    //Post request to change username
    axios.post("http://localhost:5000/user/updateOneField/" + userSession._id, {
        updateType : "username",
        username : newUsername
    })
    .then((res) => {
        if (res.status === 200){
            if(res.data === "emptyError"){
              showMessage('emptyError');
            }
            //If the user exists. Backend will return existError string
            else if(res.data === "existError"){
              showMessage('existError');
            } else{
              showMessage('sucess');
              userSession.username = newUsername;
              ReactSession.set("userSession", userSession);
            }
        } 
        else{
          Promise.reject();
        } 
      })
    .catch((err) => alert("Something went wrong: " + err));
  };
};

  return (
    <div>
      <Button
        onMouseEnter={handleFillButton}
        onMouseLeave={handleEmptyButton}
        style={{ width: "100%" }}
        variant={buttonColor}
        color="success"
        onClick={handleClickOpen}
      >
        Change Username
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Username</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={newUsername}
            name="username"
            label="New Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleSetUsername}
          />
          <span style={{color: error.color}}>{error.text}</span>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
