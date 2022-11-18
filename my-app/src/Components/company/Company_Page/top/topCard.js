import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Button, ButtonGroup } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function TopCard() {

    const params = useParams()
    const [company, setCompany] = useState()
    const [companyLocation, setCompanyLocation] = useState()
    const [companyTypeInfo, setCompanyTypeInfo] = useState()

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

    const showCompany = (event) => {
        console.log(company)
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
                            <Avatar sx={{ bgcolor: "red" }} >
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

                    <ButtonGroup variant="text" >
                        <Button>Home</Button>
                        <Button>About</Button>
                    </ButtonGroup>

                    <CardContent>
                        <Typography variant="body1" color="text.primary">
                            About
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {company ? company.companyInformation.about : null}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Box >

    );
}