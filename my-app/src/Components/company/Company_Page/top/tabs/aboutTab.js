import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Divider } from "@mui/material"


export default function AboutTab(props) {
    return (
        <div>
            <Typography variant="body1" color="text.primary">
                About
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.companyAbout}
            </Typography>
            <Divider sx={{ height: "20px" }} variant="middle" />
            <Typography variant="body1" color="text.primary">
                Tier Readiness Level
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.trl}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            <Typography variant="body1" color="text.primary">
                Company Size
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.companySize}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            <Typography variant="body1" color="text.primary">
                Owner
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.owner}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            <Typography variant="body1" color="text.primary">
                Website
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <a href={props.website}>{props.website}</a>

            </Typography>
        </div>
    )
}