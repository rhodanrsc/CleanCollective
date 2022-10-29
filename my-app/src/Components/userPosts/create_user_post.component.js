import React, { useState, useEffect } from "react";
import { Paper, FormControl, Box, TextField, Button, FormGroup} from "@mui/material";
import axios from "axios";
import { ReactSession }  from 'react-client-session';
import {TagComboBox} from "./tag_combo_box";


export default function CreatePost () {
    let userSession = ReactSession.get("userSession")
    const [postTitle, setPostTitle] = useState();
    const [postBody, setPostBody] = useState();

    const mystyle = {
        marginBottom : "10px",
        marginTop: "10px",
        width : "500px"
    }

    const boxStyle = {
        marginBottom : "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
    }

    const handlePostTitle = (event) => {
      setPostTitle(event.target.value);
    }

    const handlePostBody = (event) => {
      setPostBody(event.target.value);
    }
    let arrayOfTags = [];

    useEffect(() => {
      let listOfTags = document.getElementsByClassName("listOfTags")
      for(let i = 0; i < listOfTags.length; i++){
        arrayOfTags.push(listOfTags[i].innerHTML);
      }
    })

    const onSubmit = () => {
      if(postBody.length > 0 && postTitle.length > 0){
        axios.post("http://localhost:5000/user.post.route/addPost/" + userSession._id, {
          sector : arrayOfTags,
          postTitle : postTitle,
          postBody : postBody
        })
        .then(() => {
          console.log("Post added")
        })
        .catch((err) => {
          console.log("Something went wrong: " + err )
        })
      }
    }
   
    

    return (
    <Box 
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="20vh">
    <Paper className="paper" style={{width : "80%"}} elevation={3} >
    <Box style={boxStyle} >
        <FormControl>
        <FormGroup>

        <TagComboBox></TagComboBox>
       
        <TextField onChange={handlePostTitle} style={mystyle} label="Title"></TextField>

        <TextField 
        onChange={handlePostBody}
        multiline
        rows={10}
        
        style={mystyle} 
        label="Type your question/post"></TextField>

        <Button style={{width : "18%", marginLeft : "82%"}} onClick={onSubmit}  type="submit" variant="contained" color="success">Publish</Button>
        </FormGroup>
      </FormControl> 
      </Box>
    </Paper>

    </Box>
    
    );
}

