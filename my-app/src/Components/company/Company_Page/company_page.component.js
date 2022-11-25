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

    }

    return (
        <Box style={myStyle}>
            <Grid
                style={{
                    marginLeft: '16%',
                    marginRight: 'auto',
                    width: "70%"
                }}
                container
                direction={"column"}
                spacing={2}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={8}>
                        <TopCard />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <SideCompaniesCard title="Related Companies" />
                    </Grid>


                </Grid>

                <Grid container spacing={2}>
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