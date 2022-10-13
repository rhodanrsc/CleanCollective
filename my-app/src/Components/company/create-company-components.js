import React, { useState } from "react";
// import axios from "axios";
import CompanyForm from "./companyForm";
// import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  // const navigate = useNavigate();
  const [formValues] = useState({
    companyName: "",
    type: "",
    file: "",
    companyType: "",
    stage: "",
    employees: "",
    website: "",
    check: false
  });

  

  const OnSubmit = (companyObject) => {
    console.log(companyObject.companyName)
    // console.log(companyObject.type)
    // console.log(companyObject.companyType)
  }



  return(
    <CompanyForm
      initialValues={formValues}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      
    </CompanyForm>

  )

}

export default CreateCompany;