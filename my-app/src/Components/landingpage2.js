import React, { useState, useEffect } from 'react';
import logo from '../shared/images/CCLogo.png';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';
import landingPageBG from '../shared/images/landingPage.jpg'
import Footer from './footer';

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
        <Box sx={{width: '100%', marginRight:'0', top:80 }} className='landingPage'>
            <Stack spacing={0}>
                <Item className='banner' style={{boxShadow:'none', padding:100 }}>
                    <img className='bigLogo' src={logo} alt=''></img>
                    <br/>
                    <Typography>Get more features and privileges by joining the most helpful community</Typography>
                </Item>
                <Item style={{
                    padding:'60px',
                    boxShadow:'none' 
                }}>
                    <Typography>This is just filler text. There is no point to what you are reading. This is just to test what the section looks like with text. You do not need to read this. Why are you still reading this. You are actually just wasting your time. How does it feel to have your time wasted? You could be productive and doing more important things but here you are. Wasting time. Do you feel bad? If you don't you should. You should feel bad that you're procrastinating by reading this pointless block of text. Quack. I'm running out of things to say. If you read the entire block of text, I dare you to send a random emoji to the capstone channel on the server and never explain what it means if anyone asks. just follow any questions with a random gif. Thank you for your time lol</Typography>
                </Item>
                <Item style={{ backgroundColor: 'rgb(234,234,234)', boxShadow:'none', padding:50 }}>
                    <Grid container direction={'row'} spacing={0} style={{marginLeft: '0'}}>
                        <Grid item md={2}></Grid>
                        <Grid item md={4}>
                            <Link to={"/forum"} className="nav-link">
                                <button className='buttonGreenBig landingFont'>
                                <Typography variant='h4' >Forum Page</Typography>
                                    <br/>
                                    <br/>
                                    <Typography variant='body1'>Get the answers you've been seeking for to reach your net zero goals!</Typography>
                                </button>
                            </Link>
                        </Grid>
                        <Grid item md={4}>
                            <Link to={"/MatchingCompanies"} className="nav-link">
                                <button className='buttonGreenBig landingFont'>
                                    <Typography variant='h4'>Company Matching</Typography>
                                    <br/>
                                    <br/>
                                    <Typography variant='body1'>The Tinder of clean tech! Find aligned companies that will help you achieve your goals!</Typography>
                                </button>
                                
                            </Link>
                        </Grid>
                    </Grid>
                    
                </Item>
                <Item style={{boxShadow:'none' }}>
                    Meet the team. Insert team photo here and small block of text or something lol
                </Item>
            </Stack>
            <Footer/>
        </Box>
        
    );
};

export default LandingPage;