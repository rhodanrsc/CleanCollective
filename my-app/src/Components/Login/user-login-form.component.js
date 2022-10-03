// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLoginForm from "./user-login-form";
import { Navigate, useNavigate } from "react-router-dom";
// LoginUser Component
const UserLoginComponent = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    login_email_field: "",
    login_password_field: "",
  });
  // When user hits login button
  const onSubmit = (userObject) => {
    axios({
      method: "POST",
      data: {
        username: userObject.login_email_feild, // username to hold the email field is not a typo. It complies with the passport-local dependency conventions.
        password: userObject.login_password_feild,
      },
      withCredentials: true,
      url: "http://localhost:5000/user/login",
    })
    .then((res) => {
      if(res.status === 200){
        alert("Login Sucsess");
        navigate("/forumPage"); // page you go to after login 
      }else{
        Promise.reject();
      }
      console.log(res);
    })
    .catch((err) => alert("Incorrect username or password"));
  };

  // Return student form
  return (
    <UserLoginForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Login
    </UserLoginForm>
  );
};

// Export CreateStudent Component
export default UserLoginComponent;
