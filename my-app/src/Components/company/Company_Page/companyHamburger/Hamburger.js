import * as React from "react";
import { useEffect } from "react";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteAlertDialog from "../companyHamburger/EditButton";
import { Typography } from "@mui/material";
import { ReactSession } from "react-client-session";

import ReportAlertDialog from "../../../Posts/HamburgerButton/ReportAlertDialog";

export default function CompanyHamburger(props) {
    let userSession = ReactSession.get("userSession");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [owned, setOwned] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


    function checkOwned() {
        if (userSession && userSession.associatedCompanies.length > 0) {
            let userId = userSession._id;
            let companyId = userSession.associatedCompanies[0]._id;
            if (props.id === userId || props.id === companyId) {
                setOwned(true)
            }
        }
    }

    // Run a useEffect to compare the post id, and see if has been 'saved' by the current user through the userSession.

    useEffect(() => {
        checkOwned();
    });

    return (
        <div>
            <IconButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {owned}

                {owned ? (
                    <div>
                        <DeleteAlertDialog
                            id={props.id}
                            title={props.postTitle}
                        ></DeleteAlertDialog>
                    </div>
                ) : null}
                <Typography padding={1}>
                    <ReportAlertDialog />
                </Typography>
            </Popover>
        </div>
    );
}
