import React from "react";
import { Container, Grid, Box, Link } from "@mui/material";
import logo from '../shared/images/CCLogo.png'


export default function Footer() {
    return <footer>
        <Box 
        px={{ xs: 3, sm: 10 }} 
        py={{ xs: 5, sm: 10 }} 
        bgcolor='text.secondary' 
        color='white' 
        fontSize='small'
        style={{
            marginTop:'50px',
            padding:'10px'
        }}
        >
            <Container maxWidth='lg' style={{padding:'20px'}}>
                <Grid container spacing={5} marginLeft='100px'>
                    <Grid item xs={2} sm={2}>
                        <img className="logo" style={{width:'100px', height:'auto'}} src={logo} alt=""></img>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link href="/" color='inherit'>Contact</Link>
                        </Box>
                        <Box>
                            <Link href="/" color='inherit'>Support</Link>
                        </Box>
                        <Box>
                            <Link href="/" color='inherit'>Privacy Policy</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>About</Box>
                        <Box>
                            <Link href="/" color='inherit'>About Clean Collective</Link>
                        </Box>
                        <Box>
                            <Link href="/" color='inherit'>The Team</Link>
                        </Box>
                        <Box>
                            <Link href="/" color='inherit'>History</Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign='center' pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}  marginTop={-5}>
                    Clean Collective Inc. &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    </footer>
}