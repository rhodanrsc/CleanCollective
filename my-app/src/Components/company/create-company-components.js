import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";
import { TagComboBox }  from "../userPosts/tag_combo_box"
import { useNavigate } from "react-router-dom";
import companyCSS from "../../shared/css/createCompany.css"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogText , DialogTitle} from "@mui/material";


const CreateUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState()
  //Values for Product Form
  const [productName, setProductName] = useState()
  const [productDescription, setProductDescription] = useState()

  //Values for Company Form
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

  let arrayOfTags = [];
  useEffect(() => {
    let listOfTags = document.getElementsByClassName("listOfTags");
    for (let i = 0; i < listOfTags.length; i++) {
      arrayOfTags.push(listOfTags[i].innerHTML);
    }
  });

  //Handle Product name
  const handleSetProductName = (event) => {
    setProductName(event.target.value)
  }
  const handleSetProductDescription = (event) => {
    setProductDescription(event.target.value)
  }

  //Handles the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProduct = () => {
    console.log(productName)
    console.log(productDescription)
    console.log(arrayOfTags)
  }

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
        setNewCompanyName(companyObject.companyName)
        setOpen(true)
      } else{
        alert("Failed to create company")
      }
    })
    .catch((err) => alert("Something went wrong: " + err));

  }


  return(
    <div>
    <CompanyForm
      initialValues={formValues}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      Sign Up
    </CompanyForm>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Congratulations! {newCompanyName} is now in business!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We found that associating a <strong>product/service</strong> with your company increases frequency of visits and showings in searches!
          </DialogContentText>
          <DialogTitle>Build Your Product/Service</DialogTitle>
          <TagComboBox></TagComboBox>
        
          <TextField
            autoFocus
            margin="dense"
            id="productName"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={productName}
            onChange={handleSetProductName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="productDescription"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            rows={5}
            multiline
            value={productDescription}
            onChange={handleSetProductDescription}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>I'm lazy</Button>
          <Button onClick={handleCreateProduct}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>

  )

}

export default CreateUser;