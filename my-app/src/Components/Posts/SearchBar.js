import React, { useState } from 'react';
import { Card, IconButton, InputBase, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function FreeSolo(props) {
  const navigate = useNavigate()
  const [searchInput, setSearchValue] = useState("");

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = (event) => {
    const keyPress = event.key

    if (event.type === "click") {
      navigate("/" + props.page + "/" + searchInput)
    } else if (event.type === "keydown") {
      if (keyPress === "Enter") {
        navigate("/" + props.page + "/" + searchInput)
      }
    }
  }

  return (
    <Card
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "93%", marginLeft: "15px" }}
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


