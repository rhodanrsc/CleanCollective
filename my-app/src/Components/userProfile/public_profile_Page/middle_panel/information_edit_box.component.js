import { ReactSession } from "react-client-session";
import React, { useEffect, useState } from "react";

//material ui imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TagComboBox } from "../../../userPosts/tag_combo_box";



//profile pic
import BackgroundLetterAvatarsSmall from "./small_user_profile.component";
import Edit from "@mui/icons-material/Edit";
import axios from "axios";

//EDIT AND SAVE BUTTONS FOR ABOUT PAGE
// const handleEditClick = () => {
//   let aboutInput = document.getElementById("aboutTextBox");
//   aboutInput.removeAttribute("disabled");
  
// };


export default function DescriptionBox() {
  let data = ReactSession.get("userSession");

  const [aboutContent, setAboutContent] = useState(data.about)
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.removeAttribute("disabled");
    setEditMode(true)
  }



  const handleSaveClick = () => {
  
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.setAttribute("disabled", true);
    setEditMode(false);

    
      
      axios.post("http://localhost:5000/user/updateOneField/" + data._id, {
          updateType : "about",
          about : aboutContent
      })
      .then((res) => {
          alert("worked")
          console.log(aboutContent)
          data.about = aboutContent;
          ReactSession.set("userSession", data)
    })
    .catch((err) => alert("Something went wrong: " + err));
    
  }

  const handleAboutChange = (event) => {
     setAboutContent(event.target.value)
  }
      
  return (
    <div>
      <Paper>
        <IconButton
          color="primary"
          aria-label="edit"
          component="label"
          onClick={handleEditMode}
        >
          <EditIcon />
        </IconButton>

        <BackgroundLetterAvatarsSmall />
        <TagComboBox></TagComboBox>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="aboutTextBox"
            multiline
            maxRows={20}
            value={aboutContent}
            disabled
            onChange={handleAboutChange}
          />
        
        {editMode === true ?  <IconButton
            color="primary"
            aria-label="edit"
            component="label"
            onClick={handleSaveClick}
          >
            <SaveAltTwoToneIcon />
          </IconButton> : null}

        </Box>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
        ></Box>

        <Typography variant="email_display" component="div">
          Email: {data ? data.email : null}
        </Typography>
      </Paper>
    </div>
  );
}
