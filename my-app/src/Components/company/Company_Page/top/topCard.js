import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Button, ButtonGroup, Divider } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeTab from "./tabs/homeTab";
import AboutTab from "./tabs/aboutTab";


export default function TopCard() {

    const params = useParams()
    const [company, setCompany] = useState()
    const [companyLocation, setCompanyLocation] = useState()
    const [companyTypeInfo, setCompanyTypeInfo] = useState()
    const [currentButton, setCurrentButton] = useState("homeButton")


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

    useEffect(() => {
        let domCurrentButton = document.getElementById(currentButton)
        domCurrentButton.style.color = "green";
    }, [currentButton])

    const changeCurrentButton = (event) => {
        let domCurrentButton = document.getElementById(currentButton)
        domCurrentButton.style.color = "black";
        let buttonClicked = event.target.id
        setCurrentButton(buttonClicked)
    }

    const showCompany = (event) => {
        console.log(company)

    }

    const renderTab = (button) => {
        switch (button) {
            case "homeButton":
                return <HomeTab
                    companyAbout={company ? company.companyInformation.about : null}
                />;
            case "aboutButton":
                return <AboutTab
                    companyAbout={company ? company.companyInformation.about : null}
                    trl={company ? company.trl.stageName : null}
                    companySize={company ? company.rangeOfEmployees.minNumOfEmployees + " - " + company.rangeOfEmployees.maxNumOfEmployees + " Employees" : null}
                    owner={company ? company.members[0].memberName : null}
                    website={company ? company.website : null}
                />;
            default:
                return null;
        }
    }


    const myStyle = {
        width: "100%",
        height: "30%"
    }
    return (
        <Box>
            <Grid>
                <Button onClick={showCompany}>test</Button>
                <Card >
                    <CardHeader
                        avatar={
                            <Avatar variant="square" sx={{ bgcolor: "red" }} >
                                {company ? company.companyName.toUpperCase().substring(0, 1) : null}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={company ? company.companyName : null}
                        subheader={company ? companyLocation : null}
                    />



                    <CardContent>
                        <Typography variant="body1" color="text.primary">
                            {company ? company.companyInformation.statement : null}
                        </Typography>
                        <Typography variant="body2" color="success.main">
                            {company ? companyTypeInfo : null}
                        </Typography>
                    </CardContent>

                    <ButtonGroup variant="string" >
                        <Button onClick={changeCurrentButton} id="homeButton">Home</Button>
                        <Button onClick={changeCurrentButton} id="aboutButton">About</Button>
                        <Button onClick={changeCurrentButton} id="interestButton">Interest</Button>
                        <Button onClick={changeCurrentButton} id="membersButton">Members</Button>
                        <Button onClick={changeCurrentButton} id="productsButton">Products</Button>
                    </ButtonGroup>



                    <CardContent>
                        {renderTab(currentButton)}
                    </CardContent>
                </Card>
                <Card></Card>
            </Grid>
        </Box >

    );
}