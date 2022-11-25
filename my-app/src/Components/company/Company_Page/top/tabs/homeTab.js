import React from "react";
import { Typography, Divider, Chip } from "@mui/material"


export default function HomeTab(props) {

    const pastelColorPallete = [
        "rgba(181, 234, 215, 0.6)",
        "rgba(224, 187, 228, 0.6)",
        "rgba(104, 209, 197, 0.6)",
        "rgba(244, 179, 206, 0.6)",
        "rgba(249, 216, 206,0.6)",
        "rgba(117, 199, 234, 0.6)",
        "rgba(149, 125, 173, 0.6)",
        "#CEF2E1",
        "#FFFBD6",
        "#D7FDDF",
        "#D0D0FE",
    ];

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

            {/*Interest Section*/}
            <Typography variant="body1" color="text.primary">
                Interest
            </Typography>

            <Divider sx={{ height: "10px" }} variant="middle" />

            <Typography variant="body2" color="text.secondary">
                {props.interest ? props.interest.map((tag, index) => {
                    return (
                        <Chip component={'span'} key={tag} style={{ backgroundColor: pastelColorPallete[index], marginRight: "5px" }} variant="outlined" label={tag} />
                    )
                }) : null}
            </Typography>

        </div>
    )
}