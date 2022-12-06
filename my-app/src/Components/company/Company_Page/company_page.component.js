import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material"

//Cards
import TopCard from "./top/topCard";
import SideCompaniesCard from "./reccomendedCompanyCard.js/sideCompaniesCard";
import CompanyPost from "./companyPostCard.js/companyPosts.component";
import CreateCompanyPost from "./createCompanyPost.js/createCompanyPost.component";
import CreateCompanySidePane from "../../userProfile/public_profile_Page/side_panel/create_company_side_panel";




export default function CompanyPage() {
    let userSession = ReactSession.get("userSession");
    const params = useParams()
    const [company, setCompany] = useState()
    const [companyOwner, setCompanyOwner] = useState()



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


    useEffect(() => {
        if (company) {
            setCompanyOwner(company.members[0].memberID)
        }
    }, [company])
    const myStyle = {
        width: "120%",

    }


    return (

        < Box style={myStyle} >

            <Grid
                style={{
                    marginLeft: '16%',
                    marginRight: 'auto',
                    width: "70%"
                }}
                container
                direction={"column"}
                spacing={1}>
                <Grid container spacing={5}>
                    <Grid item xs={6} md={8}>
                        <TopCard />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <SideCompaniesCard title="Related Companies" />
                    </Grid>


                </Grid>

                <Grid container spacing={5}>
                    {companyOwner === userSession._id ? <Grid item xs={6} md={8}>

                        <CreateCompanyPost />
                    </Grid> : null}

                    <Grid style={{ marginBottom: "100px" }} item xs={6} md={8}>
                        <CompanyPost />
                    </Grid>
                    <Grid style={userSession._id !== companyOwner || userSession.username === "Bobby" ? { marginTop: "60px" } : { marginTop: "-400px" }} item xs={6} md={4}>
                        <CreateCompanySidePane />
                    </Grid>
                </Grid>
            </Grid>
        </Box >

    );


}