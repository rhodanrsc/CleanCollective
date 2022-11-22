import React, { Component } from "react";
import PostCard from "./LikedPost.Card";
import axios from "axios";
import SearchBar from "../SearchBar";
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

  getAllUserPost = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/",
    })
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        // console.log("User post data pulled from DB");
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };

  getLikedPosts = () => {
    var data = [];
    const userSession = ReactSession.get("userSession");
    let userId = userSession._id;
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/getUserLikedPosts/" + userId,
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
      <div>
        <SearchBar />
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
      </div>
    );
  }
}
export default PostPage;
