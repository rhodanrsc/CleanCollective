import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

export default function DeleteUser() {
  const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setMessage] = useState({
    color: "",
    text: ""
  }); 
  const [currentError, setCurrentMessage] = useState({
    color: "",
    text: ""
  }); 
  const [buttonColor, setButton] = useState("outlined")


  const handleFillButton = (event) => {
    setButton("contained");
  }

  //Handles the Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    hideMessage();
    hideCurrentMessage();
    resetConfirmPasswordText();
    resetCurrentPassword();
  };

  //Handles Error messages
  const showMessage = (event) => {
    if (event === "shortPasswordError") {
      setMessage({
        color: "red",
        text : "*Password must be at least 8 characters"
      });
    } else if (event === 'regexError') {
      setMessage({
        color: "red",
        text : "*Password must have at least one number"
      });

    } else if (event === 'matchPasswordError'){
      setMessage({
        color: "red",
        text : "*Passwords must match"
      });
    } else {
      setMessage({
        color: "",
        text : "Account Successfully Deleted!"
      });
    }
  };
  const hideMessage = () => {
    setMessage("");
  };

  const showCurrentMessage = (event) => {
     if(event === "passwordError"){
      setMessage({
        color: "red",
        text : "*Check your inputs."
      });
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
    
    //Post request to change Email
    axios.post("http://localhost:5000/user/delete/633f530cd44ec61d2510c83a", {
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
              showMessage('success');
              showCurrentMessage('success');
            }
        } 
        else{
          Promise.reject();
        } 
      })
    .catch((err) => alert("Something went wrong: " + err));
    
  };

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        onMouseEnter={handleFillButton}
        variant={buttonColor}
        color="error"
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
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
          <p style={{color: currentError.color}}>{currentError.text}</p>
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
          <p style={{color: error.color}}>{error.text}</p>
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
