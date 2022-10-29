import React, { useState } from "react";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import DeleteUser from "./DeleteUser";
import {Accordion, AccordionDetails, AccordionSummary, Typography, Table, TableCell , TableRow} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactSession } from 'react-client-session';
export default function ControlledAccordions() {
  let userSession = ReactSession.get("userSession")
  const [expanded, setExpanded] = useState(false);
 
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  

  return (
    
    <div>
      {/****** Account Information ******/}
      <Accordion style={{height: '100%'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>
            Account Information
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>View username, email, and associated companies.</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
          <Typography component={'span'}>
            <Table>
            <tbody>
              <TableRow>
                <TableCell>Username: </TableCell>
                <TableCell>{userSession ? userSession.username : null}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email: </TableCell>
                <TableCell>{userSession ? userSession.email : null}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Associated Companies: </TableCell>
                {userSession ? 
                userSession.associatedCompanies.map(function(company){
                  return <TableCell key={company._id}>{company.companyName}</TableCell>     
                }) : null}  
              </TableRow>
              </tbody>
            </Table>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/****** General Settings ******/}
      <Accordion style={{height: '100%'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Change username, email, and password.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ChangeUsername />
            <ChangeEmail />
            <ChangePassword/>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/****** Company Settings ******/}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>Company </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Change your company information.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
     {/****** Delete Account ******/}
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>Delete Account</Typography>
          <Typography component={'span'} sx={{ color: 'text.secondary' }}>
            Permanently delete your account.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <DeleteUser />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}