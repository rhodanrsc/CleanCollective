import React from "react";
import { Typography, Divider } from "@mui/material"


export default function AboutTab(props) {
    return (
        <div>
            {/*About Section*/}
            <Typography variant="body1" color="text.primary">
                About
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.companyAbout}
            </Typography>
            <Divider sx={{ height: "20px" }} variant="middle" />

            {/*TRL Section*/}
            <Typography variant="body1" color="text.primary">
                Tier Readiness Level
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.trl}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            {/*Company Size Section*/}
            <Typography variant="body1" color="text.primary">
                Company Size
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.companySize}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            {/*Owner Section*/}
            <Typography variant="body1" color="text.primary">
                Owner
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.owner}
            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            {/*Website Section*/}
            <Typography variant="body1" color="text.primary">
                Website
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <a href={props.website}>{props.website}</a>

            </Typography>

            <Divider sx={{ height: "20px" }} variant="middle" />

            {/*Location Section*/}
            <Typography variant="body1" color="text.primary">
                Location
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.location}

            </Typography>
        </div>
    )
}