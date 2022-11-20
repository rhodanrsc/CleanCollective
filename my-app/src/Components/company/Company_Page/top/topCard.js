import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardHeader, CardContent, Avatar, IconButton, Typography, Button, ButtonGroup } from "@mui/material"
import Hamburger from "../companyHamburger/Hamburger"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeTab from "./tabs/homeTab";
import AboutTab from "./tabs/aboutTab";
import MembersTab from "./tabs/membersTab";
import ProductTab from "./tabs/productTab";


export default function TopCard() {

    const params = useParams()
    const [company, setCompany] = useState()
    const [companyLocation, setCompanyLocation] = useState()
    const [companyTypeInfo, setCompanyTypeInfo] = useState()
    const [currentButton, setCurrentButton] = useState("homeButton")

    //Constantly grabs the current company depending on URL
    useEffect(() => {
        axios.get("http://localhost:5000/company/getCompany/" + params.companyName)
            .then((response) => {
                if (response !== null) {
                    setCompany(response.data)
                    setCompanyLocation(response.data.location.city + ", " + response.data.location.province)
                    setCompanyTypeInfo(response.data.companyType + " - " + response.data.sector.name)
                }
            })
            .catch((error) => console.log("Error with getting company: " + error))

    }, [params.companyName])

    //Constantly ensuring the current clicked button is green
    useEffect(() => {
        let domCurrentButton = document.getElementById(currentButton)
        domCurrentButton.style.color = "green";
    }, [currentButton])

    //Handles changing the new click buttton to green can changing the previous back to black
    const changeCurrentButton = (event) => {
        let domCurrentButton = document.getElementById(currentButton)
        domCurrentButton.style.color = "black";
        let buttonClicked = event.target.id
        setCurrentButton(buttonClicked)
    }


    //Handles which tab to open depending on which button is current clicked
    const renderTab = (button) => {
        switch (button) {
            case "homeButton":
                return <HomeTab
                    companyAbout={company ? company.companyInformation.about : null}
                    interest={company ? company.companyInformation.interest : null}
                />;
            case "aboutButton":
                return <AboutTab
                    companyAbout={company ? company.companyInformation.about : null}
                    trl={company ? company.trl.stageName : null}
                    companySize={company ? company.rangeOfEmployees.minNumOfEmployees + " - " + company.rangeOfEmployees.maxNumOfEmployees + " Employees" : null}
                    owner={company ? company.members[0].memberName : null}
                    website={company ? company.website : null}
                    location={company ? companyLocation : null}
                />;
            case "membersButton":
                return <MembersTab
                    members={company ? company.members : null}
                />
            case "productsButton":
                return <ProductTab
                    products={company ? company.products : null}
                />
            default:
                return null;
        }
    }

    return (
        <Box>
            <Grid>
                {/*Avatar and Heading Info Section*/}
                <Card elevation={5}>
                    <CardHeader
                        avatar={
                            <Avatar variant="square" sx={{ bgcolor: "red" }} >
                                {company ? company.companyName.toUpperCase().substring(0, 1) : null}
                            </Avatar>
                        }
                        action={
                            <Hamburger id={company ? company.members[0].memberID : null} />}
                        title={company ? company.companyName : null}
                        subheader={company ? companyLocation : null}
                    />

                    {/*Statement and companyType Section*/}
                    <CardContent>
                        <Typography variant="body1" color="text.primary">
                            {company ? company.companyInformation.statement : null}
                        </Typography>
                        <Typography variant="body2" color="success.main">
                            {company ? companyTypeInfo : null}
                        </Typography>
                    </CardContent>

                    {/*Button Section*/}
                    <ButtonGroup variant="string" >
                        <Button onClick={changeCurrentButton} id="homeButton">Home</Button>
                        <Button onClick={changeCurrentButton} id="aboutButton">About</Button>
                        <Button onClick={changeCurrentButton} id="membersButton">Members</Button>
                        <Button onClick={changeCurrentButton} id="productsButton">Products</Button>
                    </ButtonGroup>


                    {/*Dependency Tab Section*/}
                    <CardContent>
                        {renderTab(currentButton)}
                    </CardContent>
                </Card>
                <Card></Card>
            </Grid>
        </Box >

    );
}