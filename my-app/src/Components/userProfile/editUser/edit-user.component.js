import React, { useState } from "react";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import DeleteUser from "./DeleteUser";
import {
  Accordion,
  IconButton,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableCell,
  TableRow,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactSession } from "react-client-session";
import CompanySettings from "./companySettings/companySettings.component";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function ControlledAccordions() {
  let userSession = ReactSession.get("userSession");
  const [expanded, setExpanded] = useState(false);

  let userEducationString;
  let education;
  if (userSession.education) {
    education = userSession.education[0];

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
      "Institution: " +
      education.institution +
      " Date Attended: " +
      startString +
      " - " +
      endString +
      " Program: " +
      education.program +
      " Education level: " +
      education.educationLevel;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    <body className="edit-user">
      <div>
        {/****** Account Information ******/}
        <Accordion
          style={{ height: "100%" }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component={"span"} sx={{ width: "33%", flexShrink: 0 }}>
              Account Information
            </Typography>
            <Typography component={"span"} sx={{ color: "text.secondary" }}>
              View username, email, and associated companies.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={"span"}>
              <IconButton style={{ marginLeft: "90%" }}>
                <SaveOutlinedIcon />
              </IconButton>
              <Table>
                <tbody>
                  <TableRow>
                    <TableCell>Username: </TableCell>
                    <TableCell>
                      {userSession ? userSession.username : null}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Email: </TableCell>
                    <TableCell>
                      {userSession ? userSession.email : null}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>About</TableCell>
                    <TableCell>
                      {userSession ? userSession.about : null}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Current Professional Role</TableCell>
                    <TableCell>
                      {userSession ? userSession.job[0] : null}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Education</TableCell>
                    <TableCell>
                      {userEducationString ? userEducationString : null}
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Interests</TableCell>
                    <TableCell>
                      {userSession.tags
                        ? userSession.tags.map((tag, index) => {
                          return (
                            <Chip
                              component={"span"}
                              key={tag}
                              style={{
                                backgroundColor: pastelColorPallete[index],
                                marginRight: "5px",
                                display: "inline",
                              }}
                              variant="outlined"
                              label={tag}
                            />
                          );
                        })
                        : null}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Associated Companies: </TableCell>
                    {userSession.associatedCompanies
                      ? userSession.associatedCompanies.map(function (company) {
                        return (
                          <TableCell key={company._id}>
                            {company.companyName}
                          </TableCell>
                        );
                      })
                      : null}
                  </TableRow>
                </tbody>
              </Table>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/****** General Settings ******/}
        <Accordion
          style={{ height: "100%" }}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component={"span"} sx={{ width: "33%", flexShrink: 0 }}>
              General settings
            </Typography>
            <Typography component={"span"} sx={{ color: "text.secondary" }}>
              Change username, email, and password.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={"span"}>
              <ChangeUsername />
              <ChangeEmail />
              <ChangePassword />
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/****** Company Settings ******/}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography component={"span"} sx={{ width: "33%", flexShrink: 0 }}>
              Company Information
            </Typography>
            <Typography component={"span"} sx={{ color: "text.secondary" }}>
              Change your company information.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CompanySettings />
          </AccordionDetails>
        </Accordion>
        {/****** Delete Account ******/}
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography component={"span"} sx={{ width: "33%", flexShrink: 0 }}>
              Delete Account
            </Typography>
            <Typography component={"span"} sx={{ color: "text.secondary" }}>
              Permanently delete your account.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={"span"}>
              <DeleteUser />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </body>
  );
}
