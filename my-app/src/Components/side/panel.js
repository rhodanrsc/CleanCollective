import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomNavBar from '../navbar/userNavBar.component';
import QuestionsIcon from '@mui/icons-material/FormatListBulleted';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import AnswerIcon from '@mui/icons-material/CommentOutlined';
import AskIcon from '@mui/icons-material/ChatOutlined';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const bgColor = {
  backgroundColor: 'white',
};

export default function ClippedDrawer() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={bgColor}>
        <CustomNavBar/>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: {xs: 'none', md: 'flex'},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: '10px' }}>
          <List>
            {['Questions'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={()=>{navigate('/forum'+text);}}>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <QuestionsIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>

              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Liked Posts', 'Your Questions', 'Your Answers'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={()=>{navigate('/'+ text.replace(' ', ''));}}>
                <ListItemButton>
                  <ListItemIcon>
                    {text === 'Liked Posts' ? <HeartIcon /> : 
                    text === 'Your Questions' ? <AskIcon /> : 
                    text === 'Your Answers' ? <AnswerIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
