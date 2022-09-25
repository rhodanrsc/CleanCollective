// CreateUser Component to add a new user
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import emailValidator from "email-validator";
import { useNavigate } from "react-router-dom";

// CreateStudent Component
const CreateUser = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSignedUp: false
  });
 
  // onSubmit handler
  const onSubmit = (userObject) => {
    

    //Check if passwords match
    if(userObject.password !== userObject.confirmPassword){
      alert("passwords do not match");
    } else if (emailValidator.validate(userObject.email) === false){
      //Check for valid email
      alert("Invalid Email");
    } else{
      axios.post("http://localhost:5000/user/add", {
        username : userObject.username,
        email : userObject.email,
        password : userObject.password
      })
      
      .then((res) => {
        if (res.status === 200){ 
            alert("User successfully created");
            //Take us to the email page after
            navigate('/registered');
        } 
        else{
          Promise.reject();
        } 
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
