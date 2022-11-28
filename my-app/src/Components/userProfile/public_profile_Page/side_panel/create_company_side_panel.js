import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardHeader, CardContent, Avatar, Chip, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CreateCompanySidePane() {
    const navigate = useNavigate()
    const [chipButton, setChipButton] = useState("outlined");

    const fillChip = (event) => {
        setChipButton("contained")
    }
    const unFillChip = (event) => {
        setChipButton("outlined")
    }


    return (
        <Card style={{ width: "300px" }} elevation={5}>
            <CardHeader
                style={{ textAlign: "center" }}
                title="Add Your Company"
                subheader="Add your company to the clean tech innovation scene today!"
            />

            <CardContent>
                <IconButton>
                    <Chip
                        label="Create Now"
                        variant={chipButton}
                        onMouseEnter={fillChip}
                        onMouseLeave={unFillChip}
                        onClick={() => {
                            navigate("/createCompany")
                        }}
                        style={{ marginLeft: "80px" }}
                        color="primary"
                    />
                </IconButton>


            </CardContent>
        </Card>
    )
}