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
        // console.log("THis is a user post" + this.posts)
        // console.log(data);
        // console.log(this.state.posts);
        // console.log(this.state.posts[0].postBody);
        console.log("User post data pulled from DB");
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };

  // Map and display the users posts
  displayUserPost = (posts) => {
    //checks if there are no posts
    if (!posts.length) return null;
    console.log('bugtestDisplayUserPost');
    console.log(posts);

    // console.log(posts[0].postBody);

 posts.map((post) => {
      console.log("postTitle");
      console.log(post.postTitle);
      console.log("postBody");
      console.log(post.postBody);
      console.log(post._id);


      return (
        <div>
      <li key={post._id}>
{post.postTitle}
      </li>
      <p>Function called</p>
      </div>
      )
    });
  };

  render() {
    console.log("render method");
    console.log(this.state.posts);
    return (
      <div>
        <PostCard/>
        <p>Hello World</p>

          {this.state.posts.map((post) => (
        <div className="user-posts">   
        <PostCard
        title={post.postTitle}
        body={post.postBody}
          />
          </div>
      ))}
      </div>
    );
  }
}

export default PostPage;
