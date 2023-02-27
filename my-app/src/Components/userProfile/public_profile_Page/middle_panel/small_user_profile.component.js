import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

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


//for edit menu
const options = ["Edit"];
const ITEM_HEIGHT = 10;




export default function BackgroundLetterAvatarsSmall() {
  const [data, setData] = useState()
  const params = useParams()

  useEffect(() => {
    axios.get("http://localhost:5000/user/getUser/" + params.username)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log("error!" + error);
      });
  }, [params.username])

  return (
    <CardHeader
      avatar=<Avatar variant="square" sx={{ bgcolor: "red" }} >
        {data ? data.username.toUpperCase().substring(0, 1) : null}
      </Avatar>
      title={data ? data.username : ""}
      subheader={data ? data.email : ""}
      action={
        <CompanyHamburger id={data ? data._id : ""} />
      }
    />
  );
}
