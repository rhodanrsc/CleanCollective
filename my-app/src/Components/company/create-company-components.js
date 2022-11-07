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
    stage: "Level 1: Basic principles of concept are observed and reported",
    employees: "0,10",
    website: "",
    check: false,
    address : "",
    city : "",
    ZIP : "",
    province : "N/A",
    yearFounded : 2022,
    country : "Canada"

  });

  const OnSubmit = (companyObject) =>{
    
    const [employeeMinString, employeeMaxString] = companyObject.employees.split(",")
    const employeeMinNum = Number(employeeMinString)
    const employeeMaxNum = Number(employeeMaxString)

    
    axios.post("http://localhost:5000/company/add", {
      companyName : companyObject.companyName,
      file : companyObject.file,
      companyType : companyObject.type,
      employeeMin : employeeMinNum,
      employeeMax : employeeMaxNum,
      website : companyObject.website,
      check : companyObject.check,
      address : companyObject.address,
      city : companyObject.city,
      province : companyObject.province,
      country : companyObject.country,
      zip : companyObject.ZIP,
      sector : companyObject.companyType,
      trl : companyObject.stage
    })
    .then((res) => {
      if (res.status === 200){
        alert("Company created!")
      } else{
        alert("Failed to create company")
      }
    })
    .catch((err) => alert("Something went wrong: " + err));

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