import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardHeader, CardContent } from "@mui/material"
import { useParams } from "react-router-dom";
import PostCard from "../../../userProfile/public_profile_Page/ProfilePosts.Card"
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
                let isMember = false;
                if (response !== null && userSession) {

                    thisCompany.members.map((member) => {
                        if (member.memberID === userSession._id) {
                            isMember = true;
                        }
                    })

                    //If the current user is a member
                    //Show all posts
                    if (isMember) {
                        setCompanyPosts(response.data.posts.reverse())
                    } else {
                        //If not then only show public post that are non-anonymous
                        // eslint-disable-next-line array-callback-return
                        response.data.posts.reverse().map((post) => {
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

    if (userSession) {
        return (
            <Box>
                <Card elevation={5} >

                    <CardHeader
                        title="Posts"
                    />

                    <CardContent>
                        {companyPosts ? companyPosts.map((post) => {
                            return (
                                <PostCard
                                    id={post.id}
                                    username={post.postCompanyName}
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

}
