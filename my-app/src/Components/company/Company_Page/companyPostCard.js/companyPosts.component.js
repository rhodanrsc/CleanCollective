import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardHeader, CardContent, Button } from "@mui/material"
import { useParams } from "react-router-dom";
import PostCard from "../../../Posts/Post.Card"
import { ReactSession } from "react-client-session";


export default function CompanyPost() {
    let userSession = ReactSession.get("userSession");
    const params = useParams()
    const [companyPosts, setCompanyPosts] = useState()

    useEffect(() => {
        let onlyPublicPosts = []
        axios.get("http://localhost:5000/company/getCompany/" + params.companyName)
            .then((response) => {
                let thisCompany = response.data
                if (response !== null && userSession) {
                    if (thisCompany.members[0].memberID === userSession._id) {
                        setCompanyPosts(response.data.posts)
                    } else {
                        response.data.posts.map((post) => {
                            if (post.accessLevel === true && post.anonymous === false) {

                                onlyPublicPosts.push(post)
                            }
                        })
                        setCompanyPosts(onlyPublicPosts)
                    }

                }
            })
            .catch((error) => console.log("Error with getting company: " + error))

    }, [params.companyName, userSession])

    const testButton = (event) => {
        console.log(companyPosts)
    }
    return (
        <Box>
            <Card elevation={5}>

                {/* <Button onClick={testButton}>Test</Button> */}

                <CardHeader
                    title="Posts"
                />

                <CardContent>
                    {companyPosts ? companyPosts.map((post) => {
                        return (
                            <PostCard
                                id={post.id}
                                title={post.postTitle}
                                body={post.postBody}
                                likes={post.postLikes}
                                createdAt={post.createdAt}
                                key={post._id}
                                accessLevel={post.accessLevel}
                                anonymous={post.anonymous}
                                userType={post.userType}
                            />
                        )
                    }) : null}

                </CardContent>
            </Card>
        </Box>
    )
}
