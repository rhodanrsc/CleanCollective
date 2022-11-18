import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { checkCompany, checkWebsite, checkIfEmpty, checkZIP, checkDisclaimer } from "./companyCreationValidation";
import countryList from "country-list";
import { createYears, createProvinceList } from "./company.form.functions"
import InfoIcon from '@mui/icons-material/Info';
import { Popover, Typography } from '@mui/material/';

const CreateCompany = (props) => {
  const [listOfCategories, setListOfCategories] = useState();
  const [listOfTRLStages, setListOfTRLStages] = useState();
  const [checkValue, setCheckValue] = useState("");
  const [countryInput, setCountryValue] = useState("");

  //Handle Company Type Info Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCompanyTypeInfo = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    },
      1500);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //Handle TRL Info Popover
  const [trlAnchorEl, setTRLAnchorEl] = useState(null);
  const [trlInput, setTRlInput] = useState();
  const [trlDescription, setTRLDescription] = useState();

  //Handle updating the popover for TRL
  useEffect(() => {
    let currentTRL = document.getElementById("formControlSelect4").value;
    setTRlInput(currentTRL);
    if (listOfTRLStages) {
      listOfTRLStages.map(function (stage) {
        if (currentTRL === stage.stageName) {
          setTRLDescription(stage.description)
        }
      })
    }

  });


  const handleTRLInfo = (event) => {
    setTRLAnchorEl(event.currentTarget);
  }
  const handleTRLClose = () => {
    setTimeout(() => {
      setTRLAnchorEl(null);
    },
      1500);
  };
  const trlOpen = Boolean(trlAnchorEl);
  const trlID = open ? 'simple-popover' : undefined;

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
      .catch((error) => { });
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
      .catch((error) => { });
  }, [listOfTRLStages]);

  //Constantly changes the countryInput for changing the state/province select box
  useEffect(() => {
    let currentCountry = document.getElementById("formControlSelect7").value;
    setCountryValue(currentCountry);
  });

  //Handle Checkbox
  const handleCheckValue = (event) => {
    if (checkValue === "checked") {
      setCheckValue("");
    } else {
      setCheckValue("checked");
    }
    console.log(countryInput);
  };

  return (
    <div className="company-creation-background">
      <main>
        <div className="border_two">
          <h2 className="first-header">Build Your Company's Profile</h2>
          <div className="company-creation-description">
            Providing information about your company that <br />
            will get you in front of the right people.
          </div>

          <h2 className="second-header">Viewable by all users</h2>
          <br/>
          <Formik {...props} validateOnChange={false} validateOnBlur={false}>
            {({ errors, touched, isValidating, values }) => (
              <Form>
                <FormGroup>
                  {/* Company Name */}
                  <div className="companyName1">
                    <label htmlFor="companyNameInput">Name:</label>
                    <Field
                      type="text"
                      name="companyName"
                      className="form-control"
                      id="companyName"
                      placeholder="Add your organization's name"
                      validate={checkCompany}
                    />
                    {<div style={{ color: "red" }}>{errors.companyName}</div>}
                  </div>
                  <br/>
                  {/* Company Type*/}
                  <div className="type1">
                    <label htmlFor="companyType">Company Type:</label>
            
                    <Field
                      as="select"
                      name="type"
                      className="form-control"
                      id="type"
                    >
                      <option value={"Adopter"}>Adoptor</option>
                      <option value={"Inovator"}>Innovator</option>
                    </Field>
                    <InfoIcon onMouseEnter={handleCompanyTypeInfo} onMouseLeave={handleClose}></InfoIcon>

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Typography>
                        Adopter : Companies seeking to adopt, invest into and/or support new techonologies or ideas.
                      </Typography>
                      <Typography>
                        Innovator : Companies leading the charge in innovation. Seeking investment, adoption, and/or support in their mission
                      </Typography>

                    </Popover>
                  </div>

                  {/* Company Logo*/}
                  <br/>
                  <div className="file">
                    <label htmlFor="formControlFile1">Company Logo:</label>
                    <Field
                      type="file"
                      name="file"
                      className="form-control-file"
                      id="file"
                    />
                  </div>
                  <br/>
                  {/* Company Sector*/}
                  <div className="sector">
                    <label htmlFor="companyType">Sector:</label>
                    <Field
                      as="select"
                      name="companyType"
                      className="form-control"
                      id="sector"
                    >
                      {listOfCategories
                        ? listOfCategories.map(function (sector) {
                          return (
                            <option key={sector._id} value={sector.name}>
                              {sector.name}
                            </option>
                          );
                        })
                        : null}
                    </Field>
                  </div>
                  <br/>
                  {/* Company Stage*/}
                  <div className="level">
                    <label htmlFor="companyStages" className="level">
                      Technology Readiness Level:
                    </label>
                    
                    <Field
                      as="select"
                      name="stage"
                      className="form-control"
                      id="level"
                    >
                      {listOfTRLStages
                        ? listOfTRLStages.map(function (stage) {
                          return (
                            <option key={stage._id} value={stage.stageName}>
                              {stage.stageName}{" "}
                            </option>
                          );
                        })
                        : null}
                    </Field>
                    <InfoIcon onMouseEnter={handleTRLInfo} onMouseLeave={handleTRLClose}></InfoIcon>
                    <Popover
                      id={trlID}
                      open={trlOpen}
                      anchorEl={trlAnchorEl}
                      onClose={handleTRLClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      {trlInput}
                      <br></br>
                      {trlDescription}</Popover>
                  </div>
                  <br/>
                  {/* Company Employees*/}
                  <div className="employees">
                    <label htmlFor="numberOfEmployees">
                      Number of Employees:
                    </label>
                    <Field
                      as="select"
                      name="employees"
                      className="form-control"
                      id="employees"
                    >
                      <option key="0" value="0,10">
                        0-10 Employees
                      </option>
                      <option key="11" value="11,50">
                        11-50 Employees
                      </option>
                      <option key="51" value="51,100">
                        51-100 Employees
                      </option>
                      <option key="100" value="100">
                        100+ Employees
                      </option>
                    </Field>
                  </div>
                  <br/>
                  {/* Year Found */}
                  <div className="year">
                    <label>Year Founded:</label>
                    <Field
                      as="select"
                      name="yearFounded"
                      className="form-control"
                      id="year"
                    >
                      {createYears().map(function (year) {
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                  <br/>
                  {/* Webiste URL*/}
                  <div className="website">
                    <label htmlFor="websiteURL">Website:</label>
                    <Field
                      type="text"
                      name="website"
                      className="form-control"
                      id="website"
                      placeholder="Website URL"
                      validate={checkWebsite}
                    />
                    {<div style={{ color: "red" }}>{errors.website}</div>}
                  </div>
                  <br/>
                  {/* Address */}
                  <div className="address">
                    <label>Address:</label>
                    <Field
                      type="text"
                      name="address"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      validate={checkIfEmpty}
                    />
                    {<div style={{ color: "red" }}>{errors.address}</div>}
                  </div>
                  <br/>
                  {/* City */}
                  <div className="city">
                    <label>City:</label>
                    <Field
                      type="text"
                      name="city"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      validate={checkIfEmpty}
                    />
                    {<div style={{ color: "red" }}>{errors.city}</div>}
                  </div>
                  <br/>
                  {/* ZIP */}
                  <div className="zip1">
                    <label>ZIP:</label>
                    <Field
                      type="text"
                      name="ZIP"
                      className="form-control"
                      id="zip"
                      placeholder="ZIP"
                      validate={(value) => checkZIP(values.country, value)}
                    />
                    {<div style={{ color: "red" }}>{errors.ZIP}</div>}
                  </div>
                  <br/>
                  {/* Country */}

                  <div className="country">
                    <label>Country:</label>
                    <Field
                      as="select"
                      name="country"
                      className="form-control"
                      id="formControlSelect7"
                    >
                      {countryList.getNames().map(function (country) {
                        return (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                  <br/>
                  {/* State/Province */}
                  <div className="province-state">
                    <label name="province">Province/State:</label>
                    <Field
                      as="select"
                      name="province"
                      className="form-control"
                      id="formControlSelect4"
                    >
                      <option key="N/A" value="N/A">
                        N/A
                      </option>
                      {createProvinceList(countryInput).map(function (
                        province
                      ) {
                        return (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                  <br/>
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
                      validate={checkDisclaimer}
                    />
                    {<div style={{ color: "red" }}>{errors.check}</div>}

                    <label className="disclaimer" htmlFor="defaultCheck1">
                      I verify that I am an authorized representative of this
                      organization and have the right to act on its behalf in
                      the creation and management of this page. The organization
                      and I agree to the additional terms for Pages.
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
                  <span>Create Company Profile</span>
                  {props.children}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};
export default CreateCompany;
