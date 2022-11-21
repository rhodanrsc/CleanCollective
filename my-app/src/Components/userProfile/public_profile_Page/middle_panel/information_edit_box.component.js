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
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TagComboBox } from "../../../userPosts/tag_combo_box";
import { Chip } from "@mui/material"
//profile pic
import BackgroundLetterAvatarsSmall from "./small_user_profile.component";
import Edit from "@mui/icons-material/Edit";
import axios from "axios";
import { Card, CardContent } from "@mui/material";

//EDIT AND SAVE BUTTONS FOR ABOUT PAGE
// const handleEditClick = () => {
//   let aboutInput = document.getElementById("aboutTextBox");
//   aboutInput.removeAttribute("disabled");

// };

const pastelColorPallete = [
  "rgba(181, 234, 215, 0.6)",
  "rgba(224, 187, 228, 0.6)",
  "rgba(104, 209, 197, 0.6)",
  "rgba(244, 179, 206, 0.6)",
  "rgba(249, 216, 206,0.6)",
  "rgba(117, 199, 234, 0.6)",
  "rgba(149, 125, 173, 0.6)",
  "#CEF2E1",
  "#FFFBD6",
  "#D7FDDF",
  "#D0D0FE",
];

export default function DescriptionBox() {
  let data = ReactSession.get("userSession");

  const [aboutContent, setAboutContent] = useState(data.about);
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.removeAttribute("disabled");
    setEditMode(true);
  };

  const handleSaveClick = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.setAttribute("disabled", true);
    setEditMode(false);

    axios
      .post("http://localhost:5000/user/updateOneField/" + data._id, {
        updateType: "about",
        about: aboutContent,
      })
      .then((res) => {
        alert("worked");
        console.log(aboutContent);
        data.about = aboutContent;
        ReactSession.set("userSession", data);
      })
      .catch((err) => alert("Something went wrong: " + err));
  };

  const handleAboutChange = (event) => {
    setAboutContent(event.target.value);
  };

  return (
    <div>
      <Box>
        <Grid>
          <Card elevation={5}>
            <BackgroundLetterAvatarsSmall />
           
            <CardContent>
              <IconButton
                color="primary"
                aria-label="edit"
                component="label"
                onClick={handleEditMode}
              >
                <EditIcon />
              </IconButton>
            </CardContent>

            
            

            <CardContent>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h6" color="text.primary">About</Typography>
                <TextField
                  id="aboutTextBox"
                  multiline
                  ThemeProvider
                  maxRows={20}
                  value={aboutContent}
                  disabled
                  onChange={handleAboutChange}
                />

                {editMode === true ? (
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    component="label"
                    onClick={handleSaveClick}
                  >
                    <SaveAltTwoToneIcon />
                  </IconButton>
                ) : null}
              </Box>
            </CardContent>

            {/* For tag display */}
            <CardContent>
              <Typography variant="h6">Interests</Typography>
            <Typography variant="body2" color="text.secondary">
                {data.tags ? data.tags.map((tag, index) => {
                    return (
                        <Chip component={'span'} key={tag} style={{ backgroundColor: pastelColorPallete[index], marginRight: "5px" }} variant="outlined" label={tag} />
                    )

                }) : null}

            </Typography>
            </CardContent>

            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
              noValidate
              autoComplete="off"
            ></Box>
          </Card>
          <Card></Card>
        </Grid>
      </Box>
    </div>
  );
}
