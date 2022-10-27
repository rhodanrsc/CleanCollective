import React, { Component, useState } from 'react'
import PostCard from './Post.Card';
import axios from 'axios';

export class PostPage extends Component {

state = {
    postUserName: '',
    postTitle: '',
    postBody: '',
    posts: []
}

// Get the User Post Data when the component mounts (onload function)
componentDidMount = () => {
    this.getAllUserPost();
}

getAllUserPost = () => {

  axios({
    method: "GET", 
    url: "http://localhost:5000/user.post.route/"})
  .then((response) => {
    const data = response.data;
    this.setState({posts: data});
    // console.log("THis is a user post" + this.posts)
    console.log(data);
    console.log(this.state.posts);
    console.log('User post data pulled from DB');})
  .catch(() => {alert("Error pulling user post data");
});
}

// Map and display the users posts
displayUserPost = (posts) => {

    //checks if there are no posts
    if(!posts.length) return null;

console.log(posts.postTitle);
console.log(posts.postBody);

    return posts.map((post, index) => {
        <div key={index}>
        <h3>{posts.postUserName}</h3>
        <h3>{posts.postTitle}</h3>
        <p>{posts.postBody}</p>
        </div>
    });
}

  render() {
    return (<div>
        <PostCard/>
        Hello World
     <div className="userPost">{this.displayUserPost(this.state.posts)} </div>
     </div>
    )
  }
}

export default PostPage;