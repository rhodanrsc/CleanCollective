import React from "react";
import { Typography, Divider, Card, CardHeader, CardContent, Avatar, Chip } from "@mui/material"


export default function ProductTab(props) {


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

    console.log(props.products[0].name)
    return (
        <div>
            <Typography variant="body1" color="text.primary">
                {props.products ? props.products.map((product) => {
                    return (
                        <Card elevation={6} style={{ height: "1%", marginBottom: "5 px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar variant="square" size="small" sx={{ backgroundColor: "blue", width: 35, height: 35 }}>
                                        {product.name.toUpperCase().substring(0, 1)}
                                    </Avatar>
                                }
                                title={product.name}
                                subheader={product.tags.map((tag, index) => {
                                    return (
                                        <Chip component={'span'} key={tag} style={{ backgroundColor: pastelColorPallete[index], marginRight: "5px", height: "22px", marginTop: "2px" }} variant="outlined" label={tag} />
                                    )
                                })}
                            />
                            <CardContent>

                                <Typography variant="body2" color="text.primary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }) : null}
            </Typography>

        </div>
    )
}