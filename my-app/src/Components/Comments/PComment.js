import React, { useEffect, useState } from 'react'
import {ReactSession} from "react-client-session";
import axios from 'axios';

const PComment = (props) => {
let userSession = ReactSession.get("userSession");

const[backendComments, setBackendComments] = useState ([]);

function getPostComments(){
   if(userSession){
      let userId = userSession._id;
      axios.get("http://localhost:5000/comment/"+userId)
      .then((res) => {
        let likedPosts = res.data;
        //if (likedPosts.includes(props.id)){
         // setSelectedLike(true);
        //}
    })
   }
  }

// useEffect (() => {
// getPostComments();
// }, [])

  return (
    <div>{props.body}</div>
  );
};
export default PComment;

