import * as React  from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {ReactSession} from 'react-client-session'
import { Button } from '@mui/material';

export default function FreeSolo() {

React.useEffect(() => {
    getPosts();
},[])

const [posts, setPosts] = React.useState([]);



let getPosts = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/",
    })
      .then((response) => {
        const data = response.data;
        setPosts([ ...data ]);
        console.log(data)
        
        // data.map((post) => {
        //     postTitles.push(post.postTitle);
        // });

      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
    //   console.log(postTitles)
  };

let searched = '';
const search = (e) => {
  searched= e.target.value;
  console.log(searched);
}

const searchPosts = () => {

}

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        freeSolo
        id="free-solo-demo"
        sx={{width:'100%'}}
        disableClearable
        options={posts.map((option) => option.postTitle)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by title"
            // onChange={search}
            onClick={search}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
          
        )}
      />
      <Button onClick={searchPosts}>Search</Button>
    </Stack>
  );

}


