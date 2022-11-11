import React from 'react'
import PComment from './PComment'
import axios from 'axios';

const PCommentList = (props) => {

  // const state = {
  //   commentUserName: "",
  //   commentTitle: "",
  //   commentBody: "",
  //   comments: []
  // };
  
  const [commentUserName] = React.useState("");
  const [commentTitle] = React.useState("");
  const [commentBody] = React.useState("");
  const [comments, setComments] = React.useState([]);
  
 function getAllUserPost(){
    axios({
      method: "GET",
      url: "http://localhost:5000/comment/"+props.postId, 
    })
      .then((response) => {
        const data = response.data;
        setComments({data});
        console.log("User post data pulled from DB");
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };
  
     return (
    <div>
       {comments.map((comment) => (
      <PComment
      title={comment.commentTitle}
      username={comment.commentUserName}
      body={comment.commentBody}
      key={comment._id}
        />
    ))}
    </div>
  );
};
export default PCommentList;

