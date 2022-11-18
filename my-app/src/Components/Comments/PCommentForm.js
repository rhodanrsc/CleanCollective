import { useState } from "react";
import { Button, TextField } from "@mui/material";
import PCommentList from "./PComment-list-component";
import axios from "axios";
import { ReactSession } from 'react-client-session';


const PCommentForm = (props) => {
  let userSession = ReactSession.get("userSession");

  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;

  function handleSubmit (){
    console.log("handle submit function");
      axios
        .post(
          "http://localhost:5000/comment/addComment/" + props.postId,
          {
            commentUsername : userSession.username,
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
  
 function handleCancel(){
  props.setCommentToggle(!props.isCommentToggle)
    }


  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Comments" id="fullWidth" 
        className="comment-form-textarea"
        value={text}
        style= {{width:"730px", paddingLeft:"20px", paddingRight:"20px", paddingTop:"5px",marginBottom:"10px", borderRadius:"0.2em", border:"none"}}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={onSubmit} className="comment-form-button" disabled={isTextareaDisabled} style = {{marginLeft:"550px"}}>
        Enter
      </Button>
        <Button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <PCommentList postId={props.postId} />
    </form>
  );
};

export default PCommentForm;
