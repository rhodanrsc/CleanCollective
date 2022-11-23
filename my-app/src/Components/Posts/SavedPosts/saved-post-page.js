import React, { Component } from "react";
import PostCard from "./SavedPost.Card";
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
    savedPosts: []
  };

  componentDidMount = () => {
    this.getSavedPosts();
  };


  getSavedPosts = () => {
    var data = [];
    const userSession = ReactSession.get("userSession");
    let userId = userSession._id;
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/getUserSavedPostsPage/" + userId,
    })
      .then((response) => {
        data = response.data;
        console.log(data);
        this.setState({ savedPosts: data });
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
          : this.state.savedPosts
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
