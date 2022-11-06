import { ReactSession } from "react-client-session";
import React, { useState } from "react";

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

//side menu
import CustomizedMenus from "./user_description_menu.component";

//profile pic
import BackgroundLetterAvatarsSmall from "./small_user_profile.component";
import Edit from "@mui/icons-material/Edit";

//EDIT AND SAVE BUTTONS FOR ABOUT PAGE
const handleEditClick = () => {
  let aboutInput = document.getElementById("aboutTextBox");
  aboutInput.removeAttribute("disabled");
  
};


export default function DescriptionBox() {
  let data = ReactSession.get("userSession");

  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.removeAttribute("disabled");
    setEditMode(true)
  }

  const handleSaveClick = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.setAttribute("disabled", true);
    setEditMode(false)

  };

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

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="aboutTextBox"
            label="About"
            multiline
            maxRows={20}
            value={data.about}
            disabled
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
          Email: {data.email}
        </Typography>
      </Paper>
    </div>
  );
}
