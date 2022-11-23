import React, { Component } from "react";
import PostCard from "./LikedPost.Card";
import axios from "axios";
import SearchBar from "../SearchBar";
import { Grid } from "@mui/material";
import { ReactSession } from "react-client-session";

export class PostPage extends Component {
  state = {
    postUserName: "",
    postTitle: "",
    postBody: "",
    posts: [],
    search: [],
    searched: "",
    likes: [],
    likedPosts: [],
  };

  componentDidMount = () => {
    this.getLikedPosts();
  };


  getLikedPosts = () => {
    var data = [];
    const userSession = ReactSession.get("userSession");
    let userId = userSession._id;
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/getUserLikedPostsPage/" + userId,
    })
      .then((response) => {
        data = response.data;
        console.log(data);
        this.setState({ likedPosts: data });
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };

  render() {
    return (
      <Grid container direction={"column"} spacing={2}>

      <Grid item xs={6} md={8}>
        <SearchBar />
      </Grid>
      <Grid item xs={6} md={8}>
        {this.state.searched
          ? this.state.search
              .reverse()
              .map((post) => (
                <PostCard
                  id={post._id}
                  username={post.postUserName}
                  title={post.postTitle}
                  body={post.postBody}
                  likes={post.postLikes}
                  key={post._id}
                />
              ))
          : this.state.likedPosts
              .reverse()
              .map((post) => (
                <PostCard
                  id={post._id}
                  username={post.postUserName}
                  title={post.postTitle}
                  body={post.postBody}
                  likes={post.postLikes}
                  createdAt={post.createdAt}
                  key={post._id}
                />
              ))}
      </Grid>
    </Grid>
    );
  }
}
export default PostPage;
