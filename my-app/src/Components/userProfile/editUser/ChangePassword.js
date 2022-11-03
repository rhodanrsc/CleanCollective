import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import axios from "axios";
import Slide from '@mui/material/Slide';
import { ReactSession }  from 'react-client-session';

//Handles slide up animation of dialog boxes
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeEmail() {
  let userSession = ReactSession.get("userSession")
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setMessage] = useState({
    color: "",
    text: ""
  }); 
  const [buttonColor, setButton] = useState("outlined")

  //Handles filling/unfilling of buttons
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
    resetConfirmPasswordText();
    resetCurrentPassword();
    resetNewPasswordText();
  };

 /*
 Handles Error Messages
 passwordError : Invalid password.
 shortPasswordError : Password is not at least 8 characters.
 regexError : Password does not contain a number.
 matchPasswordError : The new password and current password do not match. 
 success : If all validation passes.
 */
  const showMessage = (event) => {
    if(event === "passwordError"){
      setMessage({
        color: "red",
        text : "*Invalid password"
      });
    } else if (event === "shortPasswordError") {
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
        text : "Password succesfully changed!"
      });
    }
  };
  const hideMessage = () => {
    setMessage("");
  };

  //Handles Password input
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
    if(userSession){
    //Post request to change Email
    axios.post("http://localhost:5000/user/updateOneField/" + userSession._id, {
        updateType : "password",
        currentPassword : currentPassword,
        newPassword : newPassword,
        confirmPassword : confirmPassword,
        withCredentials: true
    })
    .then((res) => {
        if (res.status === 200){
            if(res.data === 'passwordError'){
              showMessage('passwordError');
            } else if (res.data === 'matchPasswordError'){
              showMessage('matchPasswordError');
            } else if (res.data === 'shortPasswordError'){
              showMessage('shortPasswordError');
            }else if (res.data === 'regexError'){
              showMessage('regexError');
            } else {
              resetNewPasswordText();
              resetConfirmPasswordText();
              resetCurrentPassword();
              showMessage('success');
              userSession.password = newPassword
              ReactSession.set("userSession", userSession)
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
        color="success"
        onClick={handleClickOpen}
      >
        Change Password
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Password</DialogTitle>

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
