import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ToggleButton from "@mui/material/ToggleButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Hamburger from "./HamburgerButton/Hamburger";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { ReactSession } from "react-client-session";
import {  useEffect } from "react";
import { Button } from "@mui/material";
// Comments coponents
import PCommentForm from "../Comments/PCommentForm";

let id = '';

export default function PostCard(props) {

  let userSession = ReactSession.get("userSession");
  function like(e) {
    id = e.currentTarget.id;
    const userId = userSession._id
    axios.post("http://localhost:5000/user.post.route/likePost/" + id + '/' + userId)
  }
  function unlike(e) {
    id = e.currentTarget.id;
    const userId = userSession._id
    axios.post("http://localhost:5000/user.post.route/unlikePost/" + id + '/' + userId)
  }

  const [selectedLike, setSelectedLike] = React.useState(false);
  //For Front-end rendering
  const [likes, setLikes] = React.useState(props.likes);
  // Comments functions
  const [isCommentToggle, setCommentToggle] = React.useState(false);

  //checks whether a post has been liked by the current user. Runs immediately when component mounts.
  function checkLike(){
    if(userSession){
      let userId = userSession._id;
      axios.get("http://localhost:5000/user.post.route/getUserLikedPosts/"+userId)
      .then((res) => {
        let likedPosts = res.data;
        if (likedPosts.includes(props.id)){
          setSelectedLike(true);
        }
      })
    }
  }
  var options = {  year: 'numeric', month: 'short', day: 'numeric' };
  const createdAt =new Date(props.createdAt);
  let date= createdAt.toLocaleDateString("en-US", options);
 // Run a useEffect to compare the post id, and see if has been 'liked' by the current user through the userSession.
  useEffect(() => {
  checkLike();
  },[])
// test push 
  return (
    <div>
    <Card sx={{ maxWidth: "95%", marginLeft:"15px" }}>
              
      <CardHeader
      
        avatar={
          <Avatar sx={{ bgcolor: "#309A47" }} aria-label="recipe"></Avatar>
        }
        action={
          (userSession? <Hamburger id={props.id} postTitle={props.title}/> : null)}
          title=<h6><b>{props.title}</b></h6>
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.body}
<br/>
          

        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <div className="d-flex fd-column">
        
          <ToggleButton
            id= {props.id}
            value="check"
            size="small"
            color="success"
            selected={selectedLike}
            onChange={() => {
              //changes the 'liked' state of the toggle button
              setSelectedLike(!selectedLike);
              //Cosmetically (front-end only) increments the like and decrements the unlike
              if (!selectedLike){
              setLikes(likes+1);
              }else{
                setLikes(likes-1);
              }
            }}
            //determines whether to like or unlike based on the state.
            onClick={selectedLike? unlike : like}

          >

            <ThumbUpIcon style= {{paddingLeft:"6px",backgroundColor: "", color:"", border:"none"}}/>
          <Typography style = {{marginLeft:"3px", paddingLeft:"2px", paddingRight:"2px", paddingTop:"0px", paddingBottom:"-5px", borderRadius:"0.2em", border:"none"}}>{likes}</Typography>
          
          </ToggleButton>
        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button onClick={() => setCommentToggle(!isCommentToggle)}>Comment</Button>
        
        <div style={{ padding: "10px", marginLeft:"385px" }}>{"~" + props.username}</div>

      </CardActions>
      {isCommentToggle && <PCommentForm currentUserId = {props.userId} postId={props.id} isCommentToggle={isCommentToggle} setCommentToggle={setCommentToggle}/>}
    </Card>
    <br/>
    </div>
  );
}

