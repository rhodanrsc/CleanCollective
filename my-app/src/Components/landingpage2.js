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
        <Box sx={{ width: '100%', marginRight: '0', top: 80 }} className='landingPage'>
            <Stack spacing={0}>
                <Item className='banner' style={{ boxShadow: 'none', padding: 100 }}>
                    <img className='bigLogo' src={logo} alt=''></img>
                    <br />
                    <Typography>Sign up today to be part the world’s best innovative clean technology community!</Typography>
                </Item>
                <Item style={{
                    padding: '60px',
                    boxShadow: 'none'
                }}>
                    <Typography>Clean technology is a growing industry that helps companies avoid environmental damage at the source with new innovative technology through materials, processes and practices to eliminate or completely reduce the creation of pollutants or waste. We strive to create a community of companies, startups and individuals who are passionate about our planet and wants to participate in the clean technology movement. Clean Collective is here to connect everyone with similar goals to help accelerate the movement and increase technological innovations in every industry.</Typography>
                </Item>
                <Item style={{ backgroundColor: 'rgb(234,234,234)', boxShadow: 'none', padding: 50 }}>
                    <Grid container direction={'row'} spacing={0} style={{ marginLeft: '0' }}>
                        <Grid item md={2}></Grid>
                        <Grid item md={4}>
                            <Link to={"/forum"} className="nav-link">
                                <button className='buttonGreenBig landingFont'>
                                    <Typography variant='h4' >Forum Page</Typography>
                                    <br />
                                    <br />
                                    <Typography variant='body1'>Explore and create ideas and questions related to clean technology problems. </Typography>
                                </button>
                            </Link>
                        </Grid>
                        <Grid item md={4}>
                            <Link to={"/MatchingCompanies"} className="nav-link">
                                <button className='buttonGreenBig landingFont'>
                                    <Typography variant='h4'>Company Matching</Typography>
                                    <br />
                                    <br />
                                    <Typography variant='body1'> Our matching algorithm will connect you with the perfect innovator or adopter to solve your problem. </Typography>
                                </button>

                            </Link>
                        </Grid>
                    </Grid>

                </Item>

            </Stack>
            <Footer />
        </Box>

    );
};

export default LandingPage;