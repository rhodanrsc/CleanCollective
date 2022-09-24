// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLoginForm from "./user-login-form";

// LoginUser Component
const UserLoginComponent = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (userObject) => {
    

    
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