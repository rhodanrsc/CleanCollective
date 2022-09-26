// CreateUser Component to add a new user
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";

// CreateStudent Component
const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // onSubmit handler
  const onSubmit = (userObject) => {
    
    //Check if passwords match
    if(userObject.password !== userObject.confirmPassword){
      alert("passwords do not match");
    } else{
      axios
      .post("http://localhost:5000/user/add", {
        username : userObject.username,
        email : userObject.email,
        password : userObject.password
      })
      
      .then((res) => {
        if (res.status === 200) alert("User successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong: " + userObject.username));
    }
    
  };

  // Return student form
  return (
    <UserForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Sign Up
    </UserForm>
  );
};

// Export CreateStudent Component
export default CreateUser;
