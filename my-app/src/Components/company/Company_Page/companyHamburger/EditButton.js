import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { ReactSession } from "react-client-session";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function EditButton(props) {

    let navigate = useNavigate();
    let userSession = ReactSession.get("userSession");

    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        navigate("/editUser")
    };

    return (
        <div>
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <EditIcon />Edit
            </IconButton>
        </div>
    );
}
