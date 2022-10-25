import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import emailValidator from "email-validator";
import Slide from '@mui/material/Slide';
import { ReactSession }  from 'react-client-session';
//For adding slide up effect on dialog box.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeEmail() {
  let userSession = ReactSession.get("userSession")
  const [open, setOpen] = useState(false);
  const [newEmail, setEmail] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [error, setMessage] = useState({
    color: "",
    text: ""
  });

  //Handles filling/unfilling the buttons
  const [buttonColor, setButton] = useState("outlined")
  const handleFillButton = (event) => {
    setButton("contained");
  }
  const handleEmptyButton = (event) => {
    setButton("outlined");
  }

  //Handles the opening/closing of Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    hideMessage();
    resetEmail();
    resetPasswordText();
  };

  /*
  Handles Error Message:
  existError : Email already exists in the database.
  passwordError : Password is incorrect.
  regexError : Invalid email format.
  success : If all validation passes.
   */
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
    } else if(event === "regexError"){
      setMessage({
        color: "red",
        text : "Invalid email format"
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
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const resetEmail = () => {
    setEmail("");
  }

  //Handle password input
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  }
  const resetPasswordText = () => {
    setPassword("");
  }

  const onSubmit = () => {

    if(userSession){
    //Post request to change Email
    axios.post("http://localhost:5000/user/updateOneField/" + userSession._id, {
        updateType : "email",
        email : newEmail,
        currentPassword : currentPassword,
        withCredentials: true
        
    })
    .then((res) => {
        if (res.status === 200){
            //If the Email exists. Backend will return false
            let validEmail =  emailValidator.validate(newEmail);
            if(validEmail === false){
              showMessage('regexError');
            } else if(res.data === 'existError'){
              showMessage('existError');
            } else if (res.data === 'passwordError'){
              showMessage('passwordError');
            } else {
              resetPasswordText();
              showMessage('success');
              userSession.email = newEmail
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
        onMouseEnter={handleFillButton}
        onMouseLeave={handleEmptyButton}
        style={{ width: "100%", marginBottom: '5px', marginTop: '5px' }}
        variant={buttonColor}
        color="success"
        onClick={handleClickOpen}
      >
        Change Email
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Email</DialogTitle>

        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              value={currentPassword}
              name="Password"
              label="Current Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleSetPassword}
          />
          <TextField
            autoFocus
            margin="dense"
            value={newEmail}
            name="Email"
            label="New Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleSetEmail}
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
