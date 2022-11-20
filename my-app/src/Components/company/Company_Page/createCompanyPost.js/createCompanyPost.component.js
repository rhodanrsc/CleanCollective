import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardHeader, CardContent, Avatar, TextField, Switch, FormControlLabel } from "@mui/material"




export default function CreateCompanyPost() {
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

    return (
        <Box>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar variant="square" sx={{ bgcolor: "red" }} >
                            {company ? company.companyName.toUpperCase().substring(0, 1) : null}
                        </Avatar>
                    }
                    title={
                        <TextField
                            style={{ width: "80%" }}
                            multiline
                        />
                    }
                />
                <CardContent>
                    <FormControlLabel control={<Switch defaultChecked />} label="Public" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Anonymous" />
                </CardContent>
            </Card>
        </Box>
    )
}