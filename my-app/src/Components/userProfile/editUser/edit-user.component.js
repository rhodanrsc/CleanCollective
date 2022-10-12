import React, { useState } from "react";
import { ButtonGroup} from "@mui/material";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import DeleteUser from "./DeleteUser";
import {Accordion, AccordionDetails, AccordionSummary, Typography, Table, TableBody, TableCell , TableRow} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import getUser from "../../getUser";





export default function ControlledAccordions() {
  let userSession = getUser();
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Account Information
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
        
          <Typography>
            <Table>
              <TableRow>
                <TableCell>Username: </TableCell>
                <TableCell>{userSession ? userSession.username : null}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email: </TableCell>
                <TableCell>{userSession ? userSession.email : null}</TableCell>
              </TableRow>
              
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Change username, email, password.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Company </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Change your company information.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Delete Account</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Permanently delete your account.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <DeleteUser />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}