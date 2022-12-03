import * as React from 'react';
import { ReactSession } from "react-client-session";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../shared/images/logoOnly.png';
import Logout from '../logout/logout';
import { useNavigate } from "react-router-dom";

const pages = ['Questions', 'Liked Posts', 'Saved Posts', 'Your Questions', 'Matching Companies', 'About Us'];
const settings = ['Company Profile', 'Profile', 'Settings'];

const ResponsiveAppBar = () => {
  let userSession = ReactSession.get("userSession");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(userSession)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const bgColor = {
    backgroundColor: 'white',
    color: 'black'
  };

  return (

    <AppBar position="static" style={bgColor}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              ml: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Button><img src={logo} alt='' onClick={() => { navigate('/forum'); }} className='logo' /></Button>
          </Typography>


          {/* hamburger menu for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Questions') {
                    navigate('/forum');
                  } else {
                    navigate('/' + page.replace(' ', ''));
                  }

                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* logo */}
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Button><img src={logo} alt='' onClick={() => { navigate('/forum'); }} className='logo' /></Button>
          </Typography>

          {/* displays the nav buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Typography color="success" variant={"h6"} style={{ marginRight: "20px" }} className='navUsername'>{userSession ? userSession.username : null}</Typography>
          {/* profile drop down */}
          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{userSession ? userSession.username.toUpperCase().substring(0, 1) : null}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* options of drop down */}
              {/* company profile */}
              {userSession.associatedCompanies[0] ? 
              settings.slice(0, 1).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate('/companyPage/' + userSession.associatedCompanies[0].companyName);
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))
              :
              settings.slice(0, 1).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate('/createCompany');
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
             ))}

              {/* profile */}
              {settings.slice(1, 2).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate('/profilePage');
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

              {/* settings */}
              {settings.slice(2, 3).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate('/editUser');
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={handleCloseUserMenu}>
                <Logout />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
