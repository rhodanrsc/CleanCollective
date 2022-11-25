import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
    const logout = () => {
        axios({
          method: "post",
          withCredentials: true,
          url: "http://localhost:5000/user/logout",
        }).then((res) => {
          
        }).catch((err) => alert("Something went wrong: " + err));
        navigate('/');
        window.location.reload();
        sessionStorage.removeItem("__react_session__");
        
      };
  return (
    <Typography className="form-wrapper">
        <span onClick={logout}>Logout</span>
    </Typography>
  );
};

export default Logout;
