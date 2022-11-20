import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material"

//Cards
import TopCard from "./top/topCard";
import SideCompaniesCard from "./reccomendedCompanyCard.js/sideCompaniesCard";
import CompanyPost from "./companyPostCard.js/companyPosts.component";
import CreateCompanyPost from "./createCompanyPost.js/createCompanyPost.component";



export default function CompanyPage() {
    const params = useParams()
    const [company, setCompany] = useState()

    //Constantly grabs the current company depending on URL
    useEffect(() => {
        axios.get("http://localhost:5000/company/getCompany/" + params.companyName)
            .then((response) => {
                if (response !== null) {
                    setCompany(response.data)
                }
            })
            .catch((error) => console.log("Error with getting company: " + error))

    }, [params.companyName])

    const myStyle = {
        width: "120%",
        height: "100%"
    }

    return (
        <Box style={myStyle}>
            <Grid container direction={'column'} spacing={1}>
                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={6} md={8}>
                        <TopCard />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <SideCompaniesCard />
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <CreateCompanyPost />
                    </Grid>
                    <Grid style={{ marginBottom: "100px" }} item xs={6} md={8}>
                        <CompanyPost />
                    </Grid>
                </Grid>



            </Grid>
        </Box>

    );
}