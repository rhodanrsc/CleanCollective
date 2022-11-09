import * as React from 'react';
import { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlagIcon from '@mui/icons-material/Flag';
import AlertDialog from './DeleteAlertDialog';
import { ReactSession } from "react-client-session";
import axios from "axios";
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import { unstable_useEventCallback } from '@mui/utils';

export default function Hamburger(props) {
  let userSession = ReactSession.get("userSession");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [owned, setOwned] = React.useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function save(){
    if(userSession){
      console.log("save function")
      let userId = userSession._id;
      let postId = props.id;
      axios.post("http://localhost:5000/user.post.route/savePost/"+postId+"/"+userId)
      .then((res) => {
        let savedPosts = res.data;
        console.log(savedPosts);
        if (savedPosts.includes(props.id)){
          setSaved(true);
        }
      })
    }
  }

  function checkSaved(){
    if(userSession){
      let userId = userSession._id;
      axios.get("http://localhost:5000/user.post.route/getUserSavedPosts/"+userId)
      .then((res) => {
        let savedPosts = res.data;
        if (savedPosts.includes(props.id)){
          setSaved(true);
        }
      })
    }
  }

  function checkOwned(){
    if(userSession){
      let userId = userSession._id;
      axios.get("http://localhost:5000/user.post.route/getUserPosts/"+userId)
      .then((res) => {
        let posts = res.data;
        if (posts.includes(props.id)){
          setOwned(true);
        }
      })
    }
  }



   // Run a useEffect to compare the post id, and see if has been 'saved' by the current user through the userSession.

   useEffect(() => {
    checkSaved();
    checkOwned();
    },[])

  return (
    <div>
           <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}

      >
        <div><IconButton onClick={function(event){ save(); setSaved(!saved)}}>{!saved? <div><BookmarkBorderIcon/>Save</div> : <div><BookmarkIcon color='error'/>Saved</div>}</IconButton></div>



        {owned?<div><AlertDialog
        id= {props.id}
        title={props.postTitle}
          ></AlertDialog></div>: null}
        <div><IconButton><FlagIcon/>Report</IconButton></div>

      </Popover>
    </div>
  );
}
