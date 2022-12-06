import { ReactSession } from "react-client-session";
import React, { useEffect, useState } from "react";


import { Avatar, CardHeader, Chip } from "@mui/material";
//profile pic
import BackgroundLetterAvatarsSmall from "./small_user_profile.component";
import axios from "axios";
import { Card, CardContent, Box, TextField, Grid, Typography, Divider } from "@mui/material";


export default function DescriptionBox() {
  //for grabbing associated companies 
  const [company, setCompany] = useState();



  useEffect(() => {
    if (data.associatedCompanies.length > 0) {
      axios.get("http://localhost:5000/company/getCompany/" + data.associatedCompanies[0].companyName)
        .then((response) => {
          setCompany(response.data)
        })
        .catch((error) => console.log("Error with getting company: " + error))
    }
  })





  let data = ReactSession.get("userSession");


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

  let userEducationString;
  let education;
  if (data) {
    education = data.education[0];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let startMonth = new Date(education.dateStarted).getMonth();
    let thisMonthName = monthNames[startMonth];
    let startYear = new Date(education.dateStarted).getFullYear();
    let startString = thisMonthName + " " + startYear;

    let endMonth = new Date(education.dateEnded).getMonth();
    let thisMonthNameEnd = monthNames[endMonth];
    let endYear = new Date(education.dateEnded).getFullYear();
    let endString = thisMonthNameEnd + " " + endYear;

    userEducationString =
      " Date Attended: " +
      startString +
      " - " +
      endString;

  }

  const [aboutContent, setAboutContent] = useState(data.about);
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.removeAttribute("disabled");
    setEditMode(true);
  };

  const handleSaveClick = () => {
    let aboutInput = document.getElementById("aboutTextBox");
    aboutInput.setAttribute("disabled", true);
    setEditMode(false);

    axios
      .post("http://localhost:5000/user/updateOneField/" + data._id, {
        updateType: "about",
        about: aboutContent,
      })
      .then((res) => {
        alert("worked");
        console.log(aboutContent);
        data.about = aboutContent;
        ReactSession.set("userSession", data);
      })
      .catch((err) => alert("Something went wrong: " + err));
  };

  const handleAboutChange = (event) => {
    setAboutContent(event.target.value);
  };

  return (
    <div>
      <Box>
        <Grid>
          <Grid item xs={6} md={8}>
            <Card elevation={5}>
              <BackgroundLetterAvatarsSmall />

              <CardContent>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography variant="h6" color="text.primary">
                    About
                  </Typography>
                  <Typography variant="body1">
                    {data.about ? data.about : null}
                  </Typography>

                </Box>
              </CardContent>

              <CardContent>
                <Typography style={{ marginBottom: "10px" }} variant="h6" color="text.primary" >Interests</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.tags
                    ? data.tags.map((tag, index) => {
                      return (
                        <Chip
                          component={"span"}
                          key={tag}
                          style={{
                            backgroundColor: pastelColorPallete[index],
                            marginRight: "5px",
                          }}
                          variant="outlined"
                          label={tag}
                        />
                      );
                    })
                    : null}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="h6" color="text.primary">Current Professional Role</Typography>
                <Typography variant="body1">
                  {data.job ? data.job : null}
                </Typography>

              </CardContent>

              <CardContent>
                <Typography style={{ marginBottom: "10px" }} variant="h6" color="text.primary">Associated Companies</Typography>
                {data.associatedCompanies ? data.associatedCompanies.map((company) => {
                  return (
                    <Card elevation={5}>
                      <CardHeader
                        avatar={
                          <Avatar variant="square" sx={{ bgcolor: "green" }} >
                            {company.companyName.toUpperCase().substring(0, 1)}
                          </Avatar>
                        }
                        title={company.companyName}
                        subheader={company.companyType + " - " + company.sector.name}
                      />
                      <CardContent>
                        {company.companyInformation.about}
                      </CardContent>
                    </Card>
                  )

                }) : null}


              </CardContent>



              <CardContent>
                <Typography style={{ marginBottom: "10px" }} variant="h6" color="text.primary">Education</Typography>
                {data.education ? data.education.map((education) => {
                  return (
                    <Card elevation={5} key={education.institution}>
                      <CardHeader
                        avatar={
                          <Avatar variant="square" sx={{ bgcolor: "red" }} >
                            {education.institution.toUpperCase().substring(0, 1)}
                          </Avatar>
                        }
                        title={education.institution}
                        subheader={userEducationString}
                      />
                      <CardContent>
                        <Typography>
                          {education.educationLevel + " - " + education.program}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                }) : null}

              </CardContent>

            </Card>

          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
