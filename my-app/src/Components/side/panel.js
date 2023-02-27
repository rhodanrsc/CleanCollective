import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomNavBar from '../navbar/userNavBar.component';
import QuestionIcon from '@mui/icons-material/QuestionAnswerOutlined';
import FilledQuestionIcon from '@mui/icons-material/QuestionAnswer';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import FilledHeartIcon from '@mui/icons-material/Favorite';
import Matching from '@mui/icons-material/PeopleOutlined';
import FilledMatching from '@mui/icons-material/People';
import Saved from '@mui/icons-material/BookmarksOutlined';
import FilledSaved from '@mui/icons-material/Bookmarks';
import AskIcon from '@mui/icons-material/ChatOutlined';
import FilledAskIcon from '@mui/icons-material/Chat';
import About from '@mui/icons-material/InfoOutlined';
import FilledAbout from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import {ReactSession} from 'react-client-session'

const drawerWidth = 240;

const bgColor = {
  backgroundColor: 'white',
};

export default function ClippedDrawer() {
  let userSession = ReactSession.get("userSession");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState()
  const [likeIcon, setLikedIcon] = useState()
  const [savedIcon, setSavedIcon] = useState()
  const [askIcon, setAskedIcon] = useState()
  const [questionIcon, setQuestionIcon] = useState()
  const [peopleIcon, setPeopleIcon] = useState()
  const [aboutIcon, setAboutIcon] = useState()

  useEffect(() => {
    setCurrentPage(window.location.href.split("/")[3])
  }, [window.location.href])


  useEffect(() => {

    if (currentPage === "LikedPosts") {
      setLikedIcon(<FilledHeartIcon style={{ color: "green" }} />)
    } else {
      setLikedIcon(<HeartIcon />)
    }

    if (currentPage === "SavedPosts") {
      setSavedIcon(<FilledSaved style={{ color: "green" }} />)
    } else {
      setSavedIcon(<Saved />)
    }

    if (currentPage === "YourQuestions") {
      setAskedIcon(<FilledAskIcon style={{ color: "green" }} />)
    } else {
      setAskedIcon(<AskIcon />)
    }

    if (currentPage === "forum") {
      setQuestionIcon(<FilledQuestionIcon style={{ color: "green" }} />)
    } else {
      setQuestionIcon(<QuestionIcon />)
    }

    if (currentPage === "MatchingCompanies") {
      setPeopleIcon(<FilledMatching style={{ color: "green" }} />)
    } else {
      setPeopleIcon(<Matching />)
    }

    if (currentPage === "") {
      setAboutIcon(<FilledAbout style={{ color: "green" }} />)
    } else {
      setAboutIcon(<About />)
    }


  }, [currentPage])



  return (
    <div>
    <Box sx={{ display: 'flex'}}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={bgColor}>
        <CustomNavBar />
      </AppBar>
      {currentPage && currentPage !== 'MatchingCompanies' ? 
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: 'none', md: 'flex' },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: '10px' }}>
          <List>
            {['Questions'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => { navigate('/forum'); }}>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? questionIcon : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>

              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Liked Posts', 'Saved Posts'].map((text) => (
              <ListItem key={text} disablePadding onClick={() => { navigate('/' + text.replace(' ', '')); }}>
                <ListItemButton>
                  <ListItemIcon>
                    {text === 'Liked Posts' ? likeIcon :
                        text === 'Saved Posts' ? savedIcon : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              
            ))}
            {['Profile Page'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => { navigate('/profilePage/' + userSession.username); }}>
                <ListItemButton>
                  <ListItemIcon>
                    {askIcon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            {['Matching Companies'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => { navigate('/MatchingCompanies'); }}>
                <ListItemButton>
                  <ListItemIcon>
                    {peopleIcon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            {['About Us'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => { navigate('/'); }}>
                <ListItemButton>
                  <ListItemIcon>
                    {aboutIcon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> : null}
    </Box>
</div>
  );
}
