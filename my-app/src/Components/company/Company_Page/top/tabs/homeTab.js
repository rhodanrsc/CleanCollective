import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material"


export default function HomeTab(props) {
    return (
        <div>
            <Typography variant="body1" color="text.primary">
                About
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.companyAbout}
            </Typography>

        </div>
    )
}