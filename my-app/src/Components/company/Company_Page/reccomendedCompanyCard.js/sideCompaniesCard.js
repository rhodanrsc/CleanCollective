import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardHeader, CardContent, Avatar, Chip } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SideCompaniesCard(props) {
    const navigate = useNavigate();
    const params = useParams()
    const [companies, setCompanies] = useState([])
    const [chipState0, setChipState0] = useState("outlined")
    const [chipState1, setChipState1] = useState("outlined")
    const [chipState2, setChipState2] = useState("outlined")

    //Handles the filling of view Profile buttons
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
    //Handles the unfilling of view profile buttons
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

    //Checks which chip number is currently being hovered
    const checkChipNumber = (index) => {
        if (index === 0) {
            return chipState0
        } else if (index === 1) {
            return chipState1
        } else {
            return chipState2
        }
    }

    //Handles the navigation function of clicking view profile
    const handleChipClick = (event, thisCompanyName) => {
        navigate('/companyPage/' + thisCompanyName);
    }

    //Constantly grabbing the companies
    useEffect(() => {
        let listOfCompanies = []
        axios.get("http://localhost:5000/company/")
            .then((response) => {
                let allCompanies = response.data;
                
                // eslint-disable-next-line array-callback-return
                allCompanies.map((company) => {
                    listOfCompanies.push(company)
                })
                
                setCompanies(listOfCompanies)

            })
            .catch((error) => console.log("Error with getting companie: " + error))
    })


    if (companies) {
        return (
            <Box>
                <Card elevation={5} style={{ width: "300px" }}>
                    <CardHeader
                        titleTypographyProps={{ variant: 'h5' }}
                        title={props.title}
                    />
                    <CardContent>
                        {companies.map((company, index) => {
                            if (index <= 3) {  
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

                                            {/*View profile Button Section*/}
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
                                }
                        })}
                    </CardContent>


                </Card >
            </Box >
        )
    }

}