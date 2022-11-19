import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Card, CardHeader, CardContent, Avatar, IconButton, Typography, Button, ButtonGroup, Chip } from "@mui/material"

export default function SideCompaniesCard() {

    const [companies, setCompanies] = useState([])
    const [chipState, setChipState] = useState("outlined")



    useEffect(() => {
        let listOfCompanies = []
        axios.get("http://localhost:5000/company/")
            .then((response) => {
                let allCompanies = response.data;
                listOfCompanies.push(allCompanies[0])
                listOfCompanies.push(allCompanies[1])
                listOfCompanies.push(allCompanies[2])
                setCompanies(listOfCompanies)
            })
            .catch((error) => console.log("Error with getting companie: " + error))

    }, [companies])


    return (
        <Box>
            <Card elevation={5}>
                <CardHeader
                    title="Related Companies"
                />
                <CardContent>
                    {companies.map((company) => {
                        return (
                            <Card style={{ marginTop: "7px", marginBottom: "7px" }} >
                                <CardHeader
                                    key={company.companyName}
                                    avatar={
                                        <Avatar variant="square" sx={{ backgroundColor: "green" }} aria-label="recipe">
                                            {company.companyName.toUpperCase().substring(0, 1)}
                                        </Avatar>
                                    }
                                    title={company.companyName}
                                    subheader={company.companyType + " - " + company.sector.name}

                                />

                                <Chip
                                    style={{ margin: "0px 0 10px 68px" }}
                                    component={'span'}
                                    variant={chipState}
                                    label="View Profile"
                                    color="primary"

                                />


                            </Card>
                        )
                    })}
                </CardContent>


            </Card >
        </Box >
    )
}