// CreateCompany Component to add a new company
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";

// CreateStudent Component
const CreateCompany = () => {
  const [formValues, setFormValues] = useState({
    companyName: "",
    companyStatus: "",
    numberOfEmployees: "",
  });
  // onSubmit handler
  const onSubmit = (companyObject) => {
    axios
      .post("http://localhost:5000/company/add", companyObject)
      .then((res) => {
        if (res.status === 200) alert("Company successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Return student form
  return (
    <CompanyForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Company
    </CompanyForm>
  );
};

// Export CreateStudent Component
export default CreateCompany;
