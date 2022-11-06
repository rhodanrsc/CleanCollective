import React, { useState } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";
import { useNavigate } from "react-router-dom";
import companyCSS from "../../shared/css/createCompany.css"


const CreateUser = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    companyName: "",
    type: "",
    file: "",
    companyType: "",
    trl: "",
    employees: "",
    website: "",
    check: false,
    address : "",
    city : "",
    zip : "",
    city : "",
    province : "",
    yearFounded : 2022,

  });

  const OnSubmit = (companyObject) =>{
    console.log(companyObject)
    console.log(companyObject.country)

  }


  return(
    <CompanyForm
      initialValues={formValues}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      Sign Up
    </CompanyForm>

  )

}

export default CreateUser;