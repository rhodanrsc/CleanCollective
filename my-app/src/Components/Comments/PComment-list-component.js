import React, { useEffect } from 'react'
import PComment from './PComment'
import axios from 'axios';

const PCommentList = (props) => {

  const [commentUserName] = React.useState("");
  const [commentTitle] = React.useState("");
  const [commentBody] = React.useState("");
  const [comments, setComments] = React.useState([]);


 let postId = props.postId;
    
  // let postId = '636c752794c3df3f01acd710';
 function getAllUserPost(){
    axios({
      method: "GET",
      url: "http://localhost:5000/comment/getComment/"+postId, 
    })
      .then((response) => {
        const data =response.data;
       let tempComments=[];
        for(let i = 0; i < data.length ; i++) {
          tempComments.push(data[i])
        }

        setComments(tempComments);

      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };

  useEffect(() => {
    getAllUserPost();
    },[])

  
     return (
    <div>

       {comments.map((comment) => (
      <PComment
      username={comment.commentUserName}
      body={comment.commentBody}
      key={comment._id}
        />
    ))}
    </div>
  );
};
export default PCommentList;

