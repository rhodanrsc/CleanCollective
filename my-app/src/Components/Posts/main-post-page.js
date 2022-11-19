import React, { Component } from "react";
import PostCard from "./Post.Card";
import axios from "axios";
import SearchBar from "./SearchBar"
import { ReactSession }  from 'react-client-session';



export class PostPage extends Component {
  state = {
    postUserName: "",
    postTitle: "",
    postBody: "",
    posts: [],
    search: [],
    searched: ''
  };

  getSearched = () => {
      // const post = axios.get('http://localhost:5000/user.post.route/searchPost/' + searched.postTitle);

      if (this.state.posts) {
      this.state.posts.map((post) => {
        if (post.postTitle === this.state.searched) {
          this.state.search.push(post);
        }
      })
    }
  }

  // Get the User Post Data when the component mounts (onload function)
  componentDidMount = () => {
      this.getAllUserPost();
      this.getSearched();
    // this.displayUserPost();
  };

  componentDidUpdate = () => {
    this.state.search = [];
    this.getAllUserPost();
    this.state.searched = ReactSession.get('searchedValue')
    this.getSearched();
    
  }

  

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


  render() {
    return (
      <div>
        <SearchBar />
          { this.state.searched ? this.state.search.reverse().map((post) => (
         
        <PostCard
        id={post._id}
        username={post.postUserName}
        title={post.postTitle}
        body={post.postBody}
        likes={post.postLikes}
        key={post._id}
          />
          )): this.state.posts.reverse().map((post) => (
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