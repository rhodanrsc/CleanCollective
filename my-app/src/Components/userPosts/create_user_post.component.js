import React, { useState, useEffect } from "react";
import {
  Paper,
  FormControl,
  Box,
  TextField,
  Button,
  FormGroup,
  Grid,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { TagComboBox } from "./tag_combo_box";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  let userSession = ReactSession.get("userSession");
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState();
  const [postBody, setPostBody] = useState();

  const mystyle = {
    marginBottom: "10px",
    marginTop: "10px",
    width: "100%",
  };

  const boxStyle = {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handlePostTitle = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostBody = (event) => {
    setPostBody(event.target.value);
  };
  let arrayOfTags = [];

  useEffect(() => {
    let listOfTags = document.getElementsByClassName("listOfTags");
    for (let i = 0; i < listOfTags.length; i++) {
      arrayOfTags.push(listOfTags[i].innerHTML);
    }
  });

  const onSubmit = () => {
    console.log(arrayOfTags);
    console.log(postTitle);
    console.log(postBody);
    if (postBody.length > 0 && postTitle.length > 0) {
      axios
        .post(
          "http://localhost:5000/user.post.route/addPost/" + userSession._id,
          {
            sector: arrayOfTags,
            postTitle: postTitle,
            postBody: postBody,
          }
        )
        .then(() => {
          console.log("Post added");
          navigate("/forum");
        })
        .catch((err) => {
          console.log("Something went wrong: " + err);
        });
    }
  };

  return (
    <div>
      <Paper
        elevation={0}
        style={{
          marginBottom: "6%",
          marginLeft: "10%",
          color: "#808080",
          fontSize: "30px",
        }}
      >
        New Question
      </Paper>
      <Box display="flex" justifyContent="center" minHeight="20vh">
        <Paper className="paper" style={{ width: "80%" }} elevation={5}>
          <Box style={boxStyle}>
            <FormControl>
              <FormGroup>
                <TagComboBox></TagComboBox>

                <TextField
                  onChange={handlePostTitle}
                  style={mystyle}
                  label="Title"
                ></TextField>

                <TextField
                  onChange={handlePostBody}
                  multiline
                  rows={10}
                  style={mystyle}
                  label="Type your question/post"
                ></TextField>

                <Grid container spacing={32}>
                  <Grid item>
                    <Button
                      style={{ backgroundColor: "#1682FD" }}
                      variant="contained"
                    >
                      {" "}
                      <CollectionsIcon
                        sx={{ fontSize: "18px", marginRight: "4px" }}
                      ></CollectionsIcon>
                      Add Image
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={onSubmit}
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      <SendIcon
                        sx={{ fontSize: "18px", marginRight: "4px" }}
                      ></SendIcon>{" "}
                      Publish
                    </Button>
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
