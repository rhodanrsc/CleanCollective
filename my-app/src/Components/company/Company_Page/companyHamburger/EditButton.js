import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export default function EditButton(props) {

    let navigate = useNavigate();

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
