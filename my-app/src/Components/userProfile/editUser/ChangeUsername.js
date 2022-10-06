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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const onSubmit = () => {
    
    axios.post("http://localhost:5000/user/update/633b3ac3b23b7cb0f3898378", {
        username : newUsername,
        
    })
    .then((res) => {
        if (res.status === 200){ 
            alert("User updated");
        } 
        else{
          Promise.reject();
        } 
      })
    .catch((err) => alert("Something went wrong: " + err));
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ width: "200px" }}
        variant="outlined"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
