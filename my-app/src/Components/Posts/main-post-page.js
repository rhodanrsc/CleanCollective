import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./Post.Card";
import axios from "axios";
import SearchBar from "./SearchBar"
import { Grid, Button } from "@mui/material"



export default function PostPage() {
  const params = useParams()

  const [posts, setPosts] = useState()
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    setSearchValue(params.searchValue)
  }, [params.searchValue])

  useEffect(() => {
    let listOfSearchedPosts = []
    axios.get("http://localhost:5000/user.post.route/")
      .then((response) => {
        const data = response.data;


        if (searchValue) {
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
      .catch((error) => {
        console.log("Error fetching posts: " + error)
      })


  }, [params.searchValue, searchValue])


  return (
    <Grid container direction={"column"} spacing={2}>

      <Grid item xs={6} md={8}>
        <SearchBar />
      </Grid>
      <Grid item xs={6} md={8}>
        {posts ? posts.map((post) => (
          <PostCard
            id={post._id}
            username={post.postUserName}
            title={post.postTitle}
            body={post.postBody}
            likes={post.postLikes}
            createdAt={post.createdAt}
            key={post._id}
          />
        )) : ""}
      </Grid>



    </Grid>
  );

}
