import React, { useState, useEffect } from 'react';
import logo from '../shared/images/CCLogo.png';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';

let userSession = ReactSession.get("userSession")

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    marginLeft: '0',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const LandingPage = () => {

    // five sections
    // colors = white, black and green
    // big logo
    // cool picture as background
    // first block says clean collective with the logo with banner
    // next block styled paragraph describing clean collective
    // next block buttons with FAQ
    // next block the team
    // footer

    return (
        <Box sx={{width: '100%' }} style={{ margin:'0' }}>
            <Stack spacing={1}>
                <Item>
                    <img className='bigLogo' src={logo} alt=''></img>
                    <Typography>Get more features and privileges by joining the most helpful community</Typography>
                </Item>
                <Item style={{
                    padding:'60px'
                }}>
                    <Typography>This is just filler text. There is no point to what you are reading. This is just to test what the section looks like with text. You do not need to read this. Why are you still reading this. You are actually just wasting your time. How does it feel to have your time wasted? You could be productive and doing more important things but here you are. Wasting time. Do you feel bad? If you don't you should. You should feel bad that you're procrastinating by reading this pointless block of text. Quack. I'm running out of things to say. If you read the entire block of text, I dare you to send a random emoji to the capstone channel on the server and never explain what it means if anyone asks. just follow any questions with a random gif. Thank you for your time lol</Typography>
                </Item>
                <Item>
                    <Grid container direction={'column'}>
                        <Link to={"/forum"} className="nav-link">
                            <button type='submit' className='buttonGreenBig landingFont'>Questions & Answers</button>
                        </Link>
                        <Link to={"/FAQ"} className="nav-link">
                            <button type='submit' className='buttonGreenBig landingFont'>FAQs</button>
                        </Link>
                        <Link className="nav-link team">
                            <button type='submit' className='buttonGreenBig landingFont'>Meet The Team</button>
                        </Link>
                    </Grid>
                    
                </Item>
                <Item>
                    Meet the team. Insert team photo here and small block of text or something lol
                </Item>
            </Stack>
        </Box>
        
    );
};

export default LandingPage;