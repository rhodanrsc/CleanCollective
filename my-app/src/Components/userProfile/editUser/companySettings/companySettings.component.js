import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Chip } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ReactSession } from 'react-client-session';
import axios from "axios";


const pastelColorPallete = [
    "rgba(181, 234, 215, 0.6)",
    "rgba(224, 187, 228, 0.6)",
    "rgba(104, 209, 197, 0.6)",
    "rgba(244, 179, 206, 0.6)",
    "rgba(249, 216, 206,0.6)",
    "rgba(117, 199, 234, 0.6)",
    "rgba(149, 125, 173, 0.6)",
    "#CEF2E1",
    "#FFFBD6",
    "#D7FDDF",
    "#D0D0FE",
];


export default function CompanySettings() {
    let userSession = ReactSession.get("userSession")
    const [company, setCompany] = useState();
    let companyLocationInfo;
    let companyFullLocation;
    let companyInterest;

    if (company) {
        companyLocationInfo = company.location
        companyFullLocation = companyLocationInfo.address + " " + companyLocationInfo.city + ", " + companyLocationInfo.province + ", " + companyLocationInfo.country + " " + companyLocationInfo.zip
        companyInterest = company.companyInformation.interest
    }


    useEffect(() => {
        axios.get("http://localhost:5000/company/getCompany/" + userSession.associatedCompanies[0].companyName)
            .then((response) => {
                setCompany(response.data)
            })
            .catch((error) => console.log("Error with getting company: " + error))

    }, [userSession])

    const handleEditMode = (event) => {
        let thisEditClick = event.target.id
        if (thisEditClick === "nameEdit") {
            document.getElementById("nameInput").removeAttribute("disabled")
            document.getElementById("nameInput").style.color = "blue"
            console.log("yes")
        }
    }




    return (
        <Box >
            <Grid container spacing={3}>
                {/*Company Name */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Company Name:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField id="nameInput" style={{ width: "100%" }} variant="standard" value={company ? company.companyName : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon id="nameEdit" onClick={handleEditMode} />
                </Grid>

                {/*Company Statement */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Company Statement:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField
                        style={{ width: "100%" }}
                        multiline
                        variant="standard" value={company ? company.companyInformation.statement : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

                {/*About */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    About:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField
                        style={{ width: "100%" }}
                        multiline
                        variant="standard" value={company ? company.companyInformation.about : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

                {/*TRL */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Tier Readiness Level:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField multiline style={{ width: "100%" }} variant="standard" value={company ? company.trl.stageName : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

                {/*Website */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Website:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField multiline style={{ width: "100%" }} variant="standard" value={company ? company.website : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

                {/*Location*/}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Location:
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField multiline style={{ width: "100%" }} variant="standard" value={company ? companyFullLocation : ""}></TextField>
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

                {/*Interest */}
                <Grid style={{ fontSize: "15px" }} item xs={8} md={2}>
                    Interest:
                </Grid>
                <Grid item xs={8} md={8}>
                    {company ? companyInterest.map((tag, index) => {
                        return (
                            <Chip component={'span'} key={tag} style={{ backgroundColor: pastelColorPallete[index], marginRight: "5px" }} variant="outlined" label={tag} />
                        )
                    }) : ""}
                </Grid>
                <Grid item xs={8} md={2}>
                    <SaveOutlinedIcon />
                </Grid>

            </Grid>
        </Box>
    )
}