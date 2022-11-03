import { ReactSession } from "react-client-session";
import * as React from "react";

//material ui imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';

//side menu 
import CustomizedMenus from "./user_description_menu.component";
//there l be a side link for settings

//import react session
//then let user session == react session chnage password page.

//to find inspect application -> session storage then localhost thing to see session

//post card - can grab users post



export default function ProfilePage() {

    //grabbing user session data
    let data = ReactSession.get("userSession");
    let name = data.username;

  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs={10}>
        <Typography variant="h2" gutterBottom>
            {name}
          </Typography>
          <span />
            <CustomizedMenus></CustomizedMenus>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-flexible"
              label="About"
              multiline
              maxRows={20}
              value={value}
              onChange={handleChange}
            />
          </Box>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
            noValidate
            autoComplete="off"
          >
            
          </Box>
        </Grid>
        <Grid xs></Grid>
      </Grid>
    </Box>

  );
}
