import { ReactSession } from "react-client-session";
import React, {useState} from "react";

//material ui imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

//side menu
import CustomizedMenus from "./user_description_menu.component";

export default function DescriptionBox() {
  //grabbing user session data
  let data = ReactSession.get("userSession");

  const [value, setValue] = useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
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
      ></Box>
      <CustomizedMenus></CustomizedMenus>
    </div>
  );
}
