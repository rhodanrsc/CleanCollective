import React, { useState } from "react";
import { Paper, FormControl, Box, TextField, Button, FormGroup} from "@mui/material";
import axios from "axios";
import { ReactSession }  from 'react-client-session';
import {getValues, TagComboBox} from "./tag_combo_box";




export default function CreatePost () {
    let userSession = ReactSession.get("userSession")
    
    const [selectTextField, setSelectTextField] = useState();
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


    const handleSelectTextField = (event) => {
      setSelectTextField(event.target.value);
    }

    const handleAddingTextField = () => {
      console.log(selectTextField)
    }

    const handlePostTitle = (event) => {
      setPostTitle(event.target.value);
    }

    const handlePostBody = (event) => {
      setPostBody(event.target.value);
    }

    const onSubmit = () => {
      // if(postBody.length > 0){
      //   axios.post("http://localhost:5000/user.post.route/addPost/" + userSession._id, {
      //     postSector : 
      //   })
      // }
      console.log(TagComboBox)
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
        <TagComboBox ></TagComboBox>
       
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

