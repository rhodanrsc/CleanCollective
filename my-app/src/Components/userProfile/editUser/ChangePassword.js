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

export default function ChangeEmail() {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setMessage] = useState({
    color: "",
    text: ""
  }); 


  //Handles the Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    hideMessage();
    
    resetConfirmPasswordText();
    resetCurrentPassword();
    resetNewPasswordText();
  };

  //Handles Error messages
  const showMessage = (event) => {
    if(event === "existError"){
      setMessage({
        color: "red",
        text : "*Email already in use"
      });
    } else if (event === "passwordError") {
      setMessage({
        color: "red",
        text : "Incorrect password"
      });
    } else {
      setMessage({
        color: "",
        text : "Email succesfully changed!"
      });
    }
  };
  const hideMessage = () => {
    setMessage("");
  };

  //Handles Email input
  const handleSetCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const resetCurrentPassword = () => {
    setCurrentPassword("");
  }

  const handleSetNewPassword = (event) => {
    setNewPassword(event.target.value);
  }

  const resetNewPasswordText = () => {
    setNewPassword("");
  }

  const handleSetConfirmNewPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const resetConfirmPasswordText = () => {
    setConfirmPassword("");
  }

  

  const onSubmit = () => {
    
    //Post request to change Email
    axios.post("http://localhost:5000/user/updateOneField/633f530cd44ec61d2510c83a", {
        updateType : "email",
        currentPassword : currentPassword,
        withCredentials: true
        
        
    })
    .then((res) => {
        if (res.status === 200){
            //If the Email exists. Backend will return false 
            if(res.data === 'existError'){
              showMessage('existError');
            } else if (res.data === 'passwordError'){
              showMessage('passwordError');
            } else {
              resetNewPasswordText();
              resetConfirmPasswordText();
              resetCurrentPassword();
              showMessage('success');
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
        style={{ width: "200px" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Change Email
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Change Email</DialogTitle>

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
              value={newPassword}
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleSetNewPassword}
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
            onChange={handleSetConfirmNewPassword}
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
