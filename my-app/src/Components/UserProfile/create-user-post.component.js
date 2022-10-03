// Create User Post Component to add a new user post
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserPostForm from "./UserPostForm";

// Create Post Component
const CreateUserPost = () => {
  const [formValues, setFormValues] = useState({
    postSector: "",
    postTitle: "",
    postBody: "",
  });

  // onSubmit handler
  const onSubmit = (userPostObject) => {
    axios
      .post("http://localhost:5000/user.post.route/add/:id", userPostObject)

      .then((res) => {
        if (res.status === 200) alert("User Post successfully displayed");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Return student form
  return (
    <UserPostForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      User Post
    </UserPostForm>
  );
};

// Export CreateStudent Component
export default CreateUserPost;
