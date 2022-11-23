import React, { useState } from 'react';
import { Card, IconButton, InputBase, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



export default function FreeSolo() {
  const navigate = useNavigate()
  const [searchInput, setSearchValue] = useState("");

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event)
    const keyPress = event.key

    if (event.type === "click") {
      navigate("/forum/" + searchInput)
    } else if (event.type === "keydown") {
      if (keyPress === "Enter") {
        navigate("/forum/" + searchInput)

      }
    }



  }

  return (
    <Card
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "60%", marginLeft: "15px" }}
      elevation={5}
    >

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        value={searchInput}
        onChange={handleSearchInput}
        onKeyDown={handleSearch}
      />
      <IconButton tabIndex={0} onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

    </Card>
  );

}


