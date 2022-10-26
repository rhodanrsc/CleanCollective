import React, { useState } from "react";
import { Paper, InputLabel, MenuItem, FormControl, Select, Box, TextField, Button, FormGroup, Menu } from "@mui/material";
import axios from "axios";
import { ReactSession }  from 'react-client-session';



export default function CreatePost () {
    let userSession = ReactSession.get("userSession")
    const [listOfCategories, setListOfCategories] = useState(); 
    const [selectTextField, setSelectTextField] = useState();
    const [postTitle, setPostTitle] = useState();
    const [postBody, setPostBody] = useState();

    const mystyle = {
        marginBottom : "20px",
        width : "500px"
    }

    const boxStyle = {
        marginBottom : "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
    }

    const loadCategories = () => {
      axios.get("http://localhost:5000/sector/")
      .then(response => {
        if (response.data.length > 0) {
          setListOfCategories(response.data)
        }
      })
      .catch((error) => {
        console.log("Something went wrong with loading categories: " + error);
      })
      
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
    }
    

    return (
    <Box onMouseEnter={loadCategories}
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="20vh">
    <Paper className="paper" style={{width : "70%"}} elevation={3} >
    <Box style={boxStyle} >
        <FormControl>
        <FormGroup>
        <InputLabel>Category</InputLabel>
        <Select style={mystyle}
          
          
          label="Category"
          
          
        >
          {listOfCategories ? listOfCategories.map(function(category){
            return <MenuItem value={category.name}>{category.name}</MenuItem>
          }) : null}
          <MenuItem onClick={handleAddingTextField} value={selectTextField}>
            <TextField onChange={handleSelectTextField} style={{width: "50%"}} label="Add Category" variant="standard"></TextField>
          </MenuItem>
        </Select>

        <TextField onChange={handlePostTitle} style={mystyle} label="Title"></TextField>

        <TextField 
        onChange={handlePostBody}
        multiline
        rows={10}
        
        style={mystyle} 
        label="Type your question/post"></TextField>

        <Button type="submit" variant="contained" color="success">Publish</Button>
        </FormGroup>
      </FormControl> 
      </Box>
    </Paper>

    </Box>
    
    );
}

