import * as React from "react";
import Avatar from "@mui/material/Avatar";

import { ReactSession } from "react-client-session";
import { Card, CardHeader, Grid, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

export default function BackgroundLetterAvatarsSmall() {
  let data = ReactSession.get("userSession");
  let profilename = data.username;
  let email = data.email;

  //RETURNS SMALL PROFILE PIC + USERNAME SIDE BY SIDE
  return (
    <Grid direction="row" spacing={2}>
      <Card>
        <CardHeader
          avatar={<Avatar {...stringAvatar({ profilename })} />}
          title={profilename ? profilename : ""}
          subheader={email ? email : ""}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </Card>
    </Grid>
  );
}
