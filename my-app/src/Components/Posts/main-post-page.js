import React, { Component, useState } from "react";
import PostCard from "./Post.Card";
import axios from "axios";

export class PostPage extends Component {
  state = {
    postUserName: "",
    postTitle: "",
    postBody: "",
    posts: [],
  };

  // Get the User Post Data when the component mounts (onload function)
  componentDidMount = () => {
    this.getAllUserPost();
    // this.displayUserPost();
  };

  getAllUserPost = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/",
    })
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("User post data pulled from DB");
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };


  render() {
    console.log("render method");
    console.log(this.state.posts);
    return (
      <div>
          {this.state.posts.reverse().map((post) => (
         
        <PostCard
        id={post._id}
        username={post.postUserName}
        title={post.postTitle}
        body={post.postBody}
        likes={post.postLikes}

        key={post._id}

          />
          
      ))}
      </div>
    );
  }
}

export default PostPage;
