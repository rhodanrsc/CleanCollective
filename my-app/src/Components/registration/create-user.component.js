// CreateUser Component to add a new user
// Import Modules
import React, { useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";

function SendEmail() {
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("")
    const handleSend = async () => {
        setSent(true)
        try{
            await axios.post("http://localhost:5000/send_mail", {
                text
            });
        }catch (error){

        }
    }
}


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
  const onSubmit = (userObject) => {

      
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
