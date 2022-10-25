import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import { ReactSession }  from 'react-client-session';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUser() {
  let userSession = ReactSession.get("userSession")
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentError, setCurrentMessage] = useState({
    color: "",
    text: ""
  }); 
  const [buttonColor, setButton] = useState("outlined")

  //Button Fill
  const handleFillButton = (event) => {
    setButton("contained");
  }
  const handleEmptyButton = (event) => {
    setButton("outlined");
  }

  //Handles the Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    hideCurrentMessage();
    resetConfirmPasswordText();
    resetCurrentPassword();
  };

  //Handles Error messages
  const showCurrentMessage = (event) => {
     if(event === "passwordError"){
      setCurrentMessage({
        color: "red",
        text : "*Check your inputs."
      });
    } else{
      navigate('/forumPage')
    }
  };

  const hideCurrentMessage = () => {
    setCurrentMessage("");
  };

  //Handles Email input
  const handleSetCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const resetCurrentPassword = () => {
    setCurrentPassword("");
  }


  const handleSetConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const resetConfirmPasswordText = () => {
    setConfirmPassword("");
  }

  const onSubmit = () => {
    
    if(userSession){
    //Post request to change Email
    axios.post("http://localhost:5000/user/delete/" + userSession._id, {
        currentPassword : currentPassword,
        confirmPassword : confirmPassword,
        withCredentials: true 
    })
    .then((res) => {
        if (res.status === 200){
            if(res.data === 'passwordError'){
              showCurrentMessage('passwordError');
            } else {
              resetConfirmPasswordText();
              resetCurrentPassword();
              showCurrentMessage('success');
              navigate("/register");
            }
        } 
        else{
          Promise.reject();
        }
      })
    .catch((err) => alert("Something went wrong: " + err));
    }
  };

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        onMouseEnter={handleFillButton}
        onMouseLeave={handleEmptyButton}
        variant={buttonColor}
        color="error"
        onClick={handleClickOpen}
        
        aria-describedby="alert-dialog-slide-description"
      >
        Delete Account
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete Account</DialogTitle>

        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              value={currentPassword}
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleSetCurrentPassword}
          />
    
          <TextField
            autoFocus
            margin="dense"
            value={confirmPassword}
            name="confirmPassword"
            label="Re-type new Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleSetConfirmPassword}
          />
          <p style={{color: currentError.color}}>{currentError.text}</p>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button variant="contained" color="error" type="submit" onClick={onSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
