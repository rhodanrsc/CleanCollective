// CreateUser Component to add a new user
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import {checkPassword, checkEmail, checkUsername} from "./registrationValidation";

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

    //Validation
    let checkedPassword = checkPassword(userObject.password, userObject.confirmPassword);
    let checkedUsername = checkUsername(userObject.username);
    let checkedEmail = checkEmail(userObject.email);
    let isValid = true;


    if(checkedUsername === false || checkedPassword === false || checkedEmail === false){
      isValid = false;
    }

    
    
    if(isValid === true){
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
      .catch((err) => alert("Something went wrong RIGT HERE: " + err));
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
