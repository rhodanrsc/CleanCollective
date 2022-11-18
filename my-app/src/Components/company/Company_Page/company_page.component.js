import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material"

//Cards
import TopCard from "./top/topCard";



export default function CompanyPage() {

    const myStyle = {
        width: "120%",
        height: "30%"
    }
    return (
        <Box style={myStyle}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <TopCard />
                </Grid>
                <Grid item xs={6} md={4}>
                    <TopCard />
                </Grid>

            </Grid>
        </Box>

    );
}