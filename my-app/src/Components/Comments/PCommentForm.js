import { useState } from "react";
import { Button } from "@mui/material";
import PCommentList from "./PComment-list-component";


const PCommentForm = (props,handleCancel) => {

  function handleSubmit (){
    console.log("handle submit function");
    console.log(props.postId);
      // axios
      //   .post(
      //     "http://localhost:5000/user.comment.route/addComment/" + userPost._id,
      //     {
      
      //     })
      //     .then(() => {
      //     console.log("Post added");
      //     navigate("/forum");
      //   })
      //   .catch((err) => {
      //     console.log("Something went wrong: " + err);
      //   });
    }

    function testClick(){
      console.log("handle submit function");
      console.log(props.postId);
    }
  
 function handleCancel(){
     //setActiveComment(null);
    }

  const [commentTitle, setCommentTitle] = useState();
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="comment-form-button" disabled={isTextareaDisabled}>
        Submit
      </Button>
      <Button onClick={testClick}>TEST </Button>
        <Button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <PCommentList postId={props.postId}/>
    </form>
  );
};

export default PCommentForm;
