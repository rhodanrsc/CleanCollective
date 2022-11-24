import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import PostCard from "./Post.Card";
import SideCompaniesCard from "../company/Company_Page/reccomendedCompanyCard.js/sideCompaniesCard"
import axios from "axios";
import SearchBar from "./SearchBar"
import { Grid, Button } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function PostPage() {
  const params = useParams()
  const navigate = useNavigate()
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
      .catch((error) => {
        console.log("Error fetching posts: " + error)
      })


  }, [params.searchValue, searchValue])

  const handleCreatePostClick = (event) => {
    navigate("/createPost")
  }

  return (

    <Grid style={{ marginTop: "2%", width: "140%" }} container direction={"row"} spacing={5}>

      {/*Search and Create Grid */}
      <Grid item xs={6} md={12}>
        <Grid container direction={"row"} spacing={2}>
          <Grid item xs={6} md={6.5}>
            <SearchBar page="forum" />
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              onClick={handleCreatePostClick}
              style={{ width: "150px", height: "45px", marginTop: "3px" }}
              startIcon={<AddCircleOutlineIcon />}
              variant={"contained"}
              color="success"
            >Create Post</Button>
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={6} md={12}>
        <Grid container direction={"row"} spacing={2}>
          <Grid item xs={6} md={9}>
            {posts ? posts.map((post) => (
              <PostCard
                id={post._id}
                username={post.postUserName}
                title={post.postTitle}
                postsector = {post.postSector}
                body={post.postBody}
                likes={post.postLikes}
                createdAt={post.createdAt}
                key={post._id}
              />
            )) : ""}
          </Grid>
          <Grid item xs={6} md={3}>
            <SideCompaniesCard
              title="Companies of Interest"
            />
          </Grid>
        </Grid>

      </Grid>


    </Grid>
  );

}
