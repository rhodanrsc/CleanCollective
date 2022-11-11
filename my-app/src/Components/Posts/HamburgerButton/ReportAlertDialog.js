import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Flag from "@mui/icons-material/Flag";
import { ReactSession } from "react-client-session";
import RadioButtonsGroup from "./RadioButtons";






export default function ReportAlertDialog(props) {
  let userSession = ReactSession.get("userSession");

  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
      <Flag/>Report
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Report Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          <RadioButtonsGroup/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
