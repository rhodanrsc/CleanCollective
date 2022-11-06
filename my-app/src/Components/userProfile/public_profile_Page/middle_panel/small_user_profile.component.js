import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { ReactSession } from "react-client-session";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

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
      width: 35, height: 35,
    },
    // children: name.charAt(0).toUpperCase(),
     children: `${name.profilename.charAt(0).toUpperCase()}`,
  };
}

export default function BackgroundLetterAvatarsSmall() {
  let data = ReactSession.get("userSession");
  let profilename = data.username;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar({profilename})} />
      {profilename}
    </Stack>
  );
}
