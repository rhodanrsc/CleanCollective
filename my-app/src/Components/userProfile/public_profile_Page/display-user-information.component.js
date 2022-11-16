import { ReactSession } from "react-client-session";
import React, {useEffect, useState} from "react";

//material ui imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material'

//side panel 
import BackgroundLetterAvatars from "./right_panel/user_profile_image_default.component";

//middle panel
import DescriptionBox from "./middle_panel/information_edit_box.component";

import PostCard from "../../Posts/Post.Card";
import axios from "axios";



export default function ProfilePage() {

    //grabbing user session data
    let data = ReactSession.get("userSession");
    let name = data.username;

  const [value, setValue] = useState("");
  const [thisUserPosts, setThisUserPosts] = useState("")
  //constantly update the new posts on the page 
  useEffect(() => {
    let userPostList = []
    axios.get("http://localhost:5000/user/" + data._id) 
    .then((response) => {
      userPostList = response.data.posts
      setThisUserPosts(userPostList);

    })
    .catch((error) =>{
      console.log("error!" + error);
    })
  })

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const showUserPost = (event) => {
    console.log(thisUserPosts)
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs={10}>
          <Button onClick={showUserPost}>test</Button>

          
            <DescriptionBox></DescriptionBox>
            
            {thisUserPosts ? thisUserPosts.reverse().map(function(post){
              return(
              <PostCard
              id={post._id}
              username={post.postUserName}
              title={post.postTitle}
              body={post.postBody}
              likes={post.postLikes}

              key={post._id}
              />)
            
            }): null}

            <p>sdada</p>

          
        </Grid>
        <Grid xs>
        <Typography variant="h2" gutterBottom>
            <BackgroundLetterAvatars></BackgroundLetterAvatars>{name}
          </Typography>
        </Grid>
      </Grid>
    </Box>

  );
}
