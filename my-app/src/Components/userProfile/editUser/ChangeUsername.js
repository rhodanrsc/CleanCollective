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

export default function ChangeUsername() {
  const [open, setOpen] = useState(false);
  const [newUsername, setUsername] = useState("");
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
    resetUsername();
  };

  //Handles Error messages
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
    
    //Post request to change username
    axios.post("http://localhost:5000/user/updateOneField/633f530cd44ec61d2510c83a", {
        updateType : "username",
        username : newUsername
    })
    .then((res) => {
        if (res.status === 200){
            if(res.data === "emptyError"){
              showMessage('emptyError');
            }
            //If the user exists. Backend will return false
            else if(res.data === "existError"){
              showMessage('existError');
            } else{
              showMessage('sucess');
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
        variant="outlined"
        color="success"
        onClick={handleClickOpen}
      >
        Change Username
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "35%" } }}
        open={open}
        onClose={handleClose}
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
