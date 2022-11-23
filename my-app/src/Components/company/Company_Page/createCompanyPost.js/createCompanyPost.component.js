import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardContent, Avatar, TextField, Switch, FormControlLabel, Button } from "@mui/material"
import CollectionsIcon from "@mui/icons-material/Collections";
import SendIcon from "@mui/icons-material/Send";
import { TagComboBox } from "../../../userPosts/tag_combo_box";



export default function CreateCompanyPost() {
    const params = useParams()
    const [company, setCompany] = useState()
    const [postTitle, setPostTitle] = useState();
    const [postBody, setPostBody] = useState();
    const [accessSwitch, setAccessSwitch] = useState(true);
    const [anonSwitch, setAnonSwitch] = useState(true);

    const handleAccessSwitch = (event) => {
        setAccessSwitch(event.target.checked)
    }
    const handleAnonSwitch = (event) => {
        setAnonSwitch(event.target.checked)
    }

    const handlePostTitle = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostBody = (event) => {
        setPostBody(event.target.value);
    };

    //Holds the value of selected tags.
    let arrayOfTags = [];
    useEffect(() => {
        let listOfTags = document.getElementsByClassName("listOfTags");
        for (let i = 0; i < listOfTags.length; i++) {
            arrayOfTags.push(listOfTags[i].innerHTML);
        }
    });

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

    const onSubmit = (event) => {
        if (company) {
            axios.post("http://localhost:5000/company.post.route/addPost/" + company._id,
                {
                    postCompanyName: company.companyName,
                    postTitle: postTitle,
                    postBody: postBody,
                    accessLevel: accessSwitch,
                    anonymous: anonSwitch,
                    userType: "company"
                }
            )
                .then(() => {
                    console.log("Post added");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("Something went wrong: " + err);
                });
        }

    }

    return (
        <Box>
            <Card elevation={5}>

                <CardContent >
                    <Grid style={{ width: "100%" }} container spacing={1}>


                        {/*TextFields */}
                        <Grid item xs={3} md={1}><Avatar variant="square" sx={{ bgcolor: "red" }} >
                            {company ? company.companyName.toUpperCase().substring(0, 1) : null}
                        </Avatar></Grid>
                        <Grid item xs={3} md={11}>
                            <TagComboBox />
                        </Grid>
                        <Grid item xs={6} md={1}></Grid>
                        <Grid item xs={3} md={11}>
                            <TextField
                                onChange={handlePostTitle}
                                label="Title"
                                style={{ width: "84%" }}
                                multiline
                                placeholder="Post Title"
                                value={postTitle}
                            />
                        </Grid>
                        <Grid item xs={6} md={1}></Grid>
                        <Grid item xs={3} md={11}>
                            <TextField
                                onChange={handlePostBody}
                                label="Type your question/post"
                                value={postBody}
                                style={{ width: "84%" }}
                                multiline
                                rows={5}
                                placeholder="Write something"
                            />
                        </Grid>

                        {/*Switches */}
                        <Grid item xs={3} md={1}></Grid>
                        <Grid item xs={3} md={2}>
                            <FormControlLabel control={<Switch onChange={handleAccessSwitch} checked={accessSwitch} />} label="Public" />
                        </Grid>
                        <Grid item xs={3} md={2}>
                            <FormControlLabel control={<Switch onChange={handleAnonSwitch} checked={anonSwitch} />} label="Anonymous" />
                        </Grid>

                        <Grid item xs={6} md={12}></Grid>

                        {/*Buttons */}
                        <Grid item xs={6} md={1}></Grid>
                        <Grid item xs={6} md={6.8}>
                            <Button
                                style={{ backgroundColor: "#1682FD" }}
                                variant="contained"
                            >
                                {" "}
                                <CollectionsIcon
                                    sx={{ fontSize: "18px", marginRight: "4px" }}
                                ></CollectionsIcon>
                                Add Image
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={1}>

                            <Button
                                onClick={onSubmit}
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                <SendIcon
                                    sx={{ fontSize: "18px", marginRight: "4px" }}
                                ></SendIcon>{" "}
                                Publish
                            </Button>
                        </Grid>


                    </Grid>

                </CardContent>
            </Card>
        </Box>
    )
}