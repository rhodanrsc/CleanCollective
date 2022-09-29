// CreateUser Component to add a new user
// Import Modules
import React, { useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";



// CreateStudent Component
const CreateUser = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSignedUp: false
  });
 
  // onSubmit handler
  const OnSubmit = (userObject) => {

      //Take us to the email page after sending the email
      try{
      //Sends the email
      axios.post("http://localhost:5000/send_email", {
        username : userObject.username,
        userEmail : userObject.email
      });
        //Takes us to the confirmEmail page if it was sent
        navigate('/register/confirmEmail');
      }catch (error){
        console.log("Error: SendMail not working " + error)
      }

      //Adding the user to database
      axios.post("http://localhost:5000/user/add", {
      username : userObject.username,
      email : userObject.email,
      password : userObject.password
      })
      
      .then((res) => {
        if (res.status === 200){ 
            alert("User successfully created");
        } 
        else{
          Promise.reject();
        } 
      })
      .catch((err) => alert("Something went wrong: " + err));
  };

  // Return student form
 
    return (
    <UserForm
      initialValues={formValues}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      Sign Up
    </UserForm>
  );
  
  
};

// Export CreateStudent Component
export default CreateUser;
