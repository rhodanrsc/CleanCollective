

// CreateCompany Component to add a new company
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserPostForm";

// Create Post Component
const CreateUserPost = () => {
  const [formValues, setFormValues] = useState({
    postUserName: "",
    postUserProfilePic: "",
    postBody: "",
    postLikes: "",
    postDislikes: ""
  });


  // onSubmit handler
  const onLoad = (userPostObject) => {
    axios
      .get("http://localhost:5000/user.post.route/:id", userPostObject)
      
      .then((res) => {
        if (res.status === 200) alert("User Post successfully displayed");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong: " + companyObject.companyName));
  };

  // Return student form
  return (
    <UserProfile
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      User Post
    </UserProfile>
  );
};

// Export CreateStudent Component
export default CreateUserPost;




