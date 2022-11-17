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
      2000);
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
      2000);
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

          <Formik {...props} validateOnChange={false} validateOnBlur={false}>
            {({ errors, touched, isValidating, values }) => (
              <Form>
                <FormGroup>
                  {/* Company Name */}
                  <div className="form-group-create">
                    <label htmlFor="companyNameInput">Name</label>
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
                    <label htmlFor="companyType">Company Type </label>
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


                    <Field
                      as="select"
                      name="type"
                      className="form-control"
                      id="formControlSelect2"
                    >
                      <option value={"Adopter"}>Adoptor</option>
                      <option value={"Inovator"}>Innovator</option>
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

                  {/* Company Stage*/}
                  <div className="form-group-create-select">
                    <label htmlFor="companyStages">
                      Technology Readiness Level
                    </label>
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
                    <Field
                      as="select"
                      name="stage"
                      className="form-control"
                      id="formControlSelect4"
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
                  </div>

                  {/* Company Employees*/}
                  <div className="form-group-create-select">
                    <label htmlFor="numberOfEmployees">
                      Number of Employees
                    </label>
                    <Field
                      as="select"
                      name="employees"
                      className="form-control"
                      id="exampleFormControlSelect5"
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

                  {/* Year Found */}
                  <div className="form-group-create-select">
                    <label>Year Founded</label>
                    <Field
                      as="select"
                      name="yearFounded"
                      className="form-control"
                      id="formControlSelect6"
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

                  {/* Webiste URL*/}
                  <div className="form-group-create">
                    <label htmlFor="websiteURL">Website</label>
                    <Field
                      type="text"
                      name="website"
                      className="form-control"
                      id="formControlInput6"
                      placeholder="Website URL"
                      validate={checkWebsite}
                    />
                    {<div style={{ color: "red" }}>{errors.website}</div>}
                  </div>

                  {/* Address */}
                  <div className="form-group-create">
                    <label>Address</label>
                    <Field
                      type="text"
                      name="address"
                      className="form-control"
                      id="formControlInput1"
                      placeholder="Address"
                      validate={checkIfEmpty}
                    />
                    {<div style={{ color: "red" }}>{errors.address}</div>}
                  </div>

                  {/* City */}
                  <div className="form-group-create">
                    <label>City</label>
                    <Field
                      type="text"
                      name="city"
                      className="form-control"
                      id="formControlInput1"
                      placeholder="City"
                      validate={checkIfEmpty}
                    />
                    {<div style={{ color: "red" }}>{errors.city}</div>}
                  </div>
                  {/* ZIP */}
                  <div className="form-group-create">
                    <label>ZIP</label>
                    <Field
                      type="text"
                      name="ZIP"
                      className="form-control"
                      id="formControlInput1"
                      placeholder="ZIP"
                      validate={(value) => checkZIP(values.country, value)}
                    />
                    {<div style={{ color: "red" }}>{errors.ZIP}</div>}
                  </div>
                  {/* Country */}

                  <div className="form-group-create-select">
                    <label>Country</label>
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

                  {/* State/Province */}
                  <div className="form-group-create-select">
                    <label>Province/State</label>
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
                  <span>Create Company Page</span>
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
