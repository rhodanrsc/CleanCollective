import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PCommentList from "./PComment-list-component";
import axios from "axios";
import { ReactSession } from 'react-client-session';


const PCommentForm = (props) => {
  let userSession = ReactSession.get("userSession");

  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;

  function handleSubmit() {
    console.log("handle submit function");
    axios
      .post(
        "http://localhost:5000/comment/addComment/" + props.postId,
        {
          commentUsername: userSession.username,
          commentUserId: userSession._id,
          commentPostId: props.postId,
          commentBody: text
        })
      .then(() => {
        console.log("Post added");
      })
      .catch((err) => {
        console.log("Something went wrong: " + err);
      });
  }

  function handleCancel() {
    props.setCommentToggle(!props.isCommentToggle)
  }


  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <Typography marginLeft={2.5} marginTop={1}>Comments</Typography>
      <TextField label="Comments" id="fullWidth"
        multiline
        className="comment-form-textarea"
        value={text}
        style={{ 
          width: "100%", 
          maxWidth: "100%", 
          flex: 1, 
          flexWrap: 'wrap', 
          wordWrap: "break-word", 
          wordBreak: "break-word", 
          overflowWrap: "anywhere", 
          paddingLeft: "20px", 
          paddingRight: "20px", 
          marginBottom: "10px", 
          marginTop: "10px", 
          borderRadius: "0.2em", 
          border: "none" }}
        onChange={(e) => setText(e.target.value)}
        cols={60}

      />
      <Grid marginLeft={2} marginBottom={1}>
        <Button onClick={onSubmit} className="comment-form-button" disabled={isTextareaDisabled}>
          Enter
        </Button>
        <Button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
      
      <PCommentList postId={props.postId} />
    </form>
  );
};

export default PCommentForm;
