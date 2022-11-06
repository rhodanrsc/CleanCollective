import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import {checkCompany} from "./companyCreationValidation"

const CreateCompany = (props) => {
  
  const [listOfCategories, setListOfCategories] = useState();
  const [listOfTRLStages, setListOfTRLStages] = useState();
  const [checkValue, setCheckValue] = useState("");
  //Constantly updating the sector list
  useEffect(() => {
    let newList = [];
    axios
      .get("http://localhost:5000/sector/")
      .then((response) => {
        if (response.data.length > 0) {
          response.data.map(function (category) {
            newList.push(category);
          });
          setListOfCategories(newList);
        }
      })
      .catch((error) => {});
  }, [listOfCategories]);

  //Constantly updating the development stage list
  useEffect(() => {
    let newList = [];
    axios
      .get("http://localhost:5000/trl/")
      .then((response) => {
        if (response.data.length > 0) {
          response.data.map(function (category) {
            newList.push(category);
          });
          setListOfTRLStages(newList);
        }
      })
      .catch((error) => {});
  }, [listOfTRLStages]);

  //Handle Checkbox
  const handleCheckValue = (event) => {
     if(checkValue === "checked"){
      setCheckValue("");
     } else {
      setCheckValue("checked")
     }
  }
  

 
  
  return (
    <body className="company-creation-background">
      <main>
        <div className="border">
          <h2 className="first-header">Build Your Company's Profile</h2>
          <div className="company-creation-description">
            Providing information about your company that <br />
            will get you in front of the right people.
          </div>

          <h2 className="second-header">Viewable by all users</h2>

          <Formik 
              {...props} 
              validateOnChange={false}
              validateOnBlur={false}>
              {({ errors, touched, isValidating, values }) => (
            <Form>
              <FormGroup>
                {/* Company Name */}
                <div className="form-group-create">
                  <label htmlFor="companyNameInput">
                    Name (required)
                    <span
                      style={{
                        color: "#FF0000",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="companyName"
                    className="form-control"
                    id="formControlInput1"
                    placeholder="Add your organization's name"
                    validate={checkCompany}
                  />
                  {<div style={{ color: "red" }}>{errors.companyName}</div>}
                </div>

                {/* Company Type*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyType">Company Type  </label>
                  
                  <Field
                    as="select"
                    name="type"
                    className="form-control"
                    id="formControlSelect2"
                  >
                    <option>Adoptor</option>
                    <option>Innovator</option>
                  </Field>
                </div>

                {/* Company Logo*/}

                <div className="form-group-create">
                  <label htmlFor="formControlFile1">Company Logo</label>
                  <Field
                    type="file"
                    name="file"
                    className="form-control-file"
                    id="formControlFile"
                  />
                </div>

                {/* Company Sector*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyType">Sector</label>
                  <Field
                    as="select"
                    name="companyType"
                    className="form-control"
                    id="formControlSelect3"
                  >
                    {listOfCategories ? listOfCategories.map(function(sector) {
                      return(
                        <option key={sector._id} value={sector.name}>{sector.name}</option>
                      )
                    }) : null}
                 
                  </Field>
                </div>

                {/* Company Stage*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyStages">Technology Readiness Level</label>
                  <Field
                    as="select"
                    name="stage"
                    className="form-control"
                    id="formControlSelect4"
                  >
                  {listOfTRLStages ? listOfTRLStages.map(function(stage) {
                    return(
                      <option key={stage._id} value={stage.stageName}>{stage.stageName} </option>
                    )
                  }) : null}
                  </Field>
                </div>

                {/* Company Employees*/}
                <div className="form-group-create-select">
                  <label htmlFor="numberOfEmployees">Number of Employees</label>
                  <Field
                    as="select"
                    name="employees"
                    className="form-control"
                    id="exampleFormControlSelect5"
                  >
                    <option value="zero-ten">0-10 Employees</option>
                    <option value="eleven-fifty">11-50 Employees</option>
                    <option value="fiftyOne-hundred">51-100 Employees</option>
                    <option value="hundredPlus">100+ Employees</option>
                  </Field>
                </div>

                {/* Webiste URL*/}
                <div className="form-group-create">
                  <label htmlFor="websiteURL">Website</label>
                  <Field
                    type="text"
                    name="website"
                    className="form-control"
                    id="formControlInput6"
                    placeholder="Website URL"
                  />
                </div>

                {/* Disclaimer Check*/}
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    name="check"
                    type="checkbox"
                    value={checkValue}
                    id="defaultCheck1"
                    onClick={handleCheckValue}
                    checked={checkValue}
                  />

                  <label className="disclaimer" htmlFor="defaultCheck1">
                    I verify that I am an authorized representative of this
                    organization and have the right to act on its behalf in the
                    creation and management of this page. The organization and I
                    agree to the additional terms for Pages.
                  </label>
                </div>

                <div className="terms">
                  <a href="www.google.ca">
                    Read the Clean Collective Pages Terms
                  </a>
                </div>
              </FormGroup>

              <Button
                className="createButton"
                type="submit"
                name="createButton"
              >
                <span>Create Company Page</span>
                {props.children}
              </Button>
            </Form>
              )}
          </Formik>
        </div>
      </main>
    </body>
  );
};
export default CreateCompany;
