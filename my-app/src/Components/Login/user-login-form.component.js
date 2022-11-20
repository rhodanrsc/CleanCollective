// Import Modules
import React, { useState } from "react";
import axios from "axios";
import UserLoginForm from "./user-login-form";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
// LoginUser Component
const UserLoginComponent = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    login_email_field: "",
    login_password_field: "",
  });

  const [error, setError] = useState(null);

  // When user hits login button
  const onSubmit = (userObject) => {
    setError(false);
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

        navigate("/forum"); // page you go to after login 
        window.location.reload();
        ReactSession.set("userSession", res.data)
        
      }else{
        Promise.reject();
      }
      console.log(res);
    })
    .catch((err) => {setError(true);});

  };

  // Return student form
  return (
    <UserLoginForm
      initialValues={formValues}
      error={error}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Login
    </UserLoginForm>
  );
};

// Export CreateStudent Component
export default UserLoginComponent;
