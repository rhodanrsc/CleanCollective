import React, { useState } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";
import { useNavigate } from "react-router-dom";
import companyCSS from "../../shared/css/createCompany.css"


const CreateUser = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    companyName: "",
    type: "Adopter",
    file: "",
    companyType: "Oil",
    trl: "Level 1: Basic principles of concept are observed and reported",
    employees: "0,10",
    website: "",
    check: false,
    address : "",
    city : "",
    ZIP : "",
    city : "",
    province : "N/A",
    yearFounded : 2022,
    country : "Canada"

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