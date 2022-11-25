import React, { useEffect } from 'react'
import PComment from './PComment'
import axios from 'axios';
import { Stack, Typography } from '@mui/material';

const PCommentList = (props) => {

  const [comments, setComments] = React.useState([]);

 let postId = props.postId;
  

// Triggers these functions when 'comments' state changes and when componentMounts. 
  useEffect(() => {
    // getAllUserPost();
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
    },[comments, postId])
    
     return (
    <Stack spacing={1} marginLeft={1} marginRight={1} marginBottom={1}>
       {  comments.map((comment) => (
      <PComment
      username=<b>{comment.commentUsername}</b>
      body={comment.commentBody}
      createdAt={comment.createdAt}
      key={comment._id}
        />
    ))  }

    </Stack>
  );
};
export default PCommentList;

