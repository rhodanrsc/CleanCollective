import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Card, CardHeader, CardContent, Avatar, IconButton, Typography, Button, ButtonGroup, Chip } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SideCompaniesCard() {
    const navigate = useNavigate();
    const params = useParams()
    const [companies, setCompanies] = useState([])
    let chipState;
    const [chipState0, setChipState0] = useState("outlined")
    const [chipState1, setChipState1] = useState("outlined")
    const [chipState2, setChipState2] = useState("outlined")

    const handleChipFill = (event) => {
        let hoveredChip = event.target.id


        if (hoveredChip === "chip0") {
            setChipState0("contained")
        } else if (hoveredChip === "chip1") {
            setChipState1("contained")
        } else if (hoveredChip === "chip2") {
            setChipState2("contained")
        }
    }

    const handleChipUnFill = (event) => {
        let hoveredChip = event.target.id
        if (hoveredChip === "chip0") {
            setChipState0("outlined")
        } else if (hoveredChip === "chip1") {
            setChipState1("outlined")
        } else if (hoveredChip === "chip2") {
            setChipState2("outlined")
        }
    }

    const checkChipNumber = (index) => {
        if (index === 0) {
            return chipState0
        } else if (index === 1) {
            return chipState1
        } else {
            return chipState2
        }
    }

    const handleChipClick = (event, thisCompanyName) => {
        navigate('/companyPage/' + thisCompanyName);
    }




    useEffect(() => {
        let listOfCompanies = []
        axios.get("http://localhost:5000/company/")
            .then((response) => {
                let allCompanies = response.data;
                allCompanies.map((company, index) => {
                    if (company.companyName === params.companyName) {
                        allCompanies.splice(index, 1)
                    }
                })
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
                    {companies.map((company, index) => {
                        return (
                            <Card key={company.companyName + "Card"} style={{ marginTop: "7px", marginBottom: "7px" }} >
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
                                    key={company.companyName + "" + index}

                                    onMouseEnter={handleChipFill}
                                    onMouseLeave={handleChipUnFill}
                                    onClick={event => handleChipClick(event, company.companyName)}

                                    id={"chip" + index}
                                    style={{ margin: "0px 0 10px 68px" }}
                                    component={'span'}
                                    variant={checkChipNumber(index)}
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