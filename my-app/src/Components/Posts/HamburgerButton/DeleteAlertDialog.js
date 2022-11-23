import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ReactSession } from "react-client-session";
import axios from "axios";




export default function DeleteAlertDialog(props) {
  let userSession = ReactSession.get("userSession");

  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deletePost(){
    if(userSession){
      let userId = userSession._id;
      let postId = props.id;
      axios.post("http://localhost:5000/user.post.route/delete-user.post/"+postId+"/"+userId)
      
    }
  }

  return (
    <div>
      <IconButton size='small' variant="outlined" onClick={handleClickOpen}>
      <DeleteOutlineIcon/>Delete
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Confirm delete post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          Delete "{props.title}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={function(event){ deletePost();window.location.reload(false);}} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
