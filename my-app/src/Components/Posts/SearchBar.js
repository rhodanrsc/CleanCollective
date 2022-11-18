import * as React  from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {ReactSession} from 'react-client-session'
import { Button } from '@mui/material';

let searched = '';

export default function FreeSolo() {

React.useEffect(() => {
    getPosts();
},[])

const [posts, setPosts] = React.useState([]);

const [searchInput, setSearchInput] = React.useState('')

let getPosts = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/user.post.route/",
    })
      .then((response) => {
        const data = response.data;
        setPosts([ ...data ]);
      })
      .catch((err) => {
        alert("Error pulling user post data");
      });
  };

const search = (e) => {
  searched= e.target.value;
  ReactSession.set('searchedValue', searched);
  console.log(searchInput)
}

const handleSearchClick = (e) => {
  let searchBar = document.getElementById('free-solo-demo').value
  console.log(searchBar);
  setSearchInput(searchBar);
  ReactSession.set('searchedValue', searchInput);
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
            className='searchBar'
            {...params}
            label="Search by title"
            onKeyUp={search}
            // onClick={search}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
          
        )}
      />
      <Button onClick={handleSearchClick} value={searchInput}>Search</Button>
    </Stack>
  );

}


