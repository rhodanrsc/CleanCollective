import React from "react";
import { Formik, Form, Field} from "formik";
import { FormGroup, Button } from "react-bootstrap";
// import { companyNameInput } from "./create-company-validation";


const CreateCompany = (props) => {

  return (
    <div className="company-creation-background">
      <div className="border">

        <main>
          <h2 className="first-header">Build Your Company's Profile</h2>
          <div className="company-creation-description">Providing information about your company that <br />
            will get you in front of the right people.</div>

          <h2 className="second-header">Viewable by all users</h2>

          <Formik {...props}>  
              <Form>
                <FormGroup>
                {/* Company Name */}
                <div className="form-group-create">
                  <label htmlFor="companyNameInput">Name (required)
                    <span style={{
                      color: '#FF0000',
                    }}
                    > *</span>
                  </label>
                  <Field type="text" name="companyName" className="form-control" id="formControlInput1" placeholder="Add your organization's name"  required  />

                </div>

                {/* Company Type*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyType">Company Type</label>
                  <Field as="select" name="type" className="form-control" id="formControlSelect2" >
                    <option>Adoptor</option>
                    <option>Innovator</option>
                  </Field>
                </div>

                {/* Company Logo*/}
                
                  <div className="form-group-create">
                    <label htmlFor="formControlFile1">Company Logo</label>
                    <Field type="file" name="file" className="form-control-file" id="formControlFile" />
                  </div>
                

                {/* Company Status*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyType">Sector</label>
                  <Field as="select" name="companyType" className="form-control" id="formControlSelect3" >
                    <option value="oil-gas">Oil & Gas</option>
                    <option value="clean-energy">Clean Energy</option>
                  </Field>
                </div>

                {/* Company Stage*/}
                <div className="form-group-create-select">
                  <label htmlFor="companyStages">Development Stage</label>
                  <Field as="select" name="stage" className="form-control" id="formControlSelect4" >
                    <option value="seed">Seed and Development</option>
                    <option value="startup">Startup</option>
                    <option value="growth">Growth and Establishment</option>
                    <option value="expansion">Expansion</option>
                    <option value="maturity">Maturity</option>
                  </Field>
                </div>

                {/* Company Employees*/}
                <div className="form-group-create-select">
                  <label htmlFor="numberOfEmployees">Number of Employees</label>
                  <Field as="select" name="employees" className="form-control" id="exampleFormControlSelect5" >
                    <option value="zero-ten">0-10 Employees</option>
                    <option value="eleven-fifty">11-50 Employees</option>
                    <option value="fiftyOne-hundred">51-100 Employees</option>
                    <option value="hundredPlus">100+ Employees</option>
                  </Field>
                </div>

                {/* Webiste URL*/}
                <div className="form-group-create">
                  <label htmlFor="websiteURL">Website</label>
                  <Field type="text" name="website" className="form-control" id="formControlInput6" placeholder="Website URL" />
                </div>


                {/* Disclaimer Check*/}
                <div className="form-check">
                  <Field className="form-check-input" name="check" type="checkbox"  value="" id="defaultCheck1" />
                  
                  <label className="disclaimer" htmlFor="defaultCheck1">
                    I verify that I am an authorized representative of this organization
                    and have the right to act on its behalf in the creation and management of this page.
                    The organization and I agree to the additional terms for Pages.
                  </label>

                </div>

                <div className="terms">
                  <a href="www.google.ca">Read the Clean Collective Pages Terms</a>
                </div>
                </FormGroup>
                
                <Button className="createButton" type="submit" name="createButton"><span>Create Company Page</span>
                {props.children}
                </Button>


              </Form>
            
          </Formik>
        </main>
      </div>

    </div>
  );
};
export default CreateCompany;