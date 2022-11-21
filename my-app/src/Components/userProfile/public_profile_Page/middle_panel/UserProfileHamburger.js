import * as React from "react";
import { useEffect } from "react";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteAlertDialog from "../../../Posts/HamburgerButton/DeleteAlertDialog";
import { ReactSession } from "react-client-session";
import axios from "axios";
import ReportAlertDialog from "../../../Posts/HamburgerButton/ReportAlertDialog";

export default function UserProfileHamburger(props) {
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
    if (userSession) {
      let userId = userSession._id;
      axios
        .get("http://localhost:5000/user.post.route/getUserPosts/" + userId)
        .then((res) => {
          let posts = res.data;
          if (posts.includes(props.id)) {
            setOwned(true);
          }
        });
    }
  }


  useEffect(() => {
    checkOwned();
  },[]);

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

        {owned ? (
          <div>
            <DeleteAlertDialog
              id={props.id}
              title={props.postTitle}
            ></DeleteAlertDialog>
          </div>
        ) : null}
        <ReportAlertDialog />
      </Popover>
    </div>
  );
}
