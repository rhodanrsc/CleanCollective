import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./LikedPost.Card";
import axios from "axios";
import SearchBar from "../SearchBar";
import { Grid } from "@mui/material";
import { ReactSession } from "react-client-session";

export default function PostPage() {
  const userSession = ReactSession.get("userSession");
  const params = useParams()
  const [posts, setPosts] = useState()
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    setSearchValue(params.searchValue)
  }, [params.searchValue])

  useEffect(() => {
    var data = [];
    let userId = userSession._id;
    let listOfSearchedPosts = []
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/getUserLikedPostsPage/" + userId,
    })
      .then((response) => {
        data = response.data;
        if (searchValue) {
          // eslint-disable-next-line array-callback-return
          data.map((post) => {
            if (post.postTitle.toLowerCase().match(searchValue.toLowerCase())) {
              listOfSearchedPosts.push(post);
            }
          })
          setPosts(listOfSearchedPosts.reverse())
        } else {
          setPosts(data.reverse())
        }

      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  }, [searchValue, userSession._id])


  return (
    <Grid container direction={"column"} spacing={2}>

      <Grid item xs={6} md={8}>
        <SearchBar page="LikedPosts" />
      </Grid>
      <Grid item xs={6} md={8}>
        {posts
          ? posts
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
            ))
          : null}
      </Grid>
    </Grid>
  );

}
