import * as React from "react";
import Avatar from "@mui/material/Avatar";

import { ReactSession } from "react-client-session";
import { Card, CardHeader, Grid, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import CompanyHamburger from "../../../company/Company_Page/companyHamburger/Hamburger";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 45,
      height: 45,
    },
    // children: name.charAt(0).toUpperCase(),
    children: `${name.profilename.charAt(0).toUpperCase()}`,
  };
}

//for edit menu
const options = ["Edit"];
const ITEM_HEIGHT = 10;




export default function BackgroundLetterAvatarsSmall() {
  let data = ReactSession.get("userSession");
  let profilename = data.username;
  let email = data.email;

  //for edit menu 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //RETURNS SMALL PROFILE PIC + USERNAME SIDE BY SIDE
  return (
    <Grid container direction="row" spacing={2}>
      <Card>
        <CardHeader
          avatar={<Avatar {...stringAvatar({ profilename })} />}
          title={profilename ? profilename : ""}
          subheader={email ? email : ""}
          action={
           <CompanyHamburger id={data ? data._id : ""}/>
          }
        />
      </Card>
    </Grid>

  );
}
