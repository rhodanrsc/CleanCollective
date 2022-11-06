import React from "react";
import { Formik, Form, Field} from "formik";
import { FormGroup, Button } from "react-bootstrap";
// import { companyNameInput } from "./create-company-validation";


const CreateCompany = (props) => {

  return (
    <div className="company-creation-background">
      

        <main>
        <div className="border_two">
          <h2 className="first-header">Build Your Company's Profile</h2>
          <div className="company-creation-description">Providing information about your company that <br />
            will get you in front of the right people.</div>

          <h2 className="second-header">Viewable by all users</h2>
          <br/>
                
          <Formik {...props}>  
              <Form>
                <FormGroup>
                
                {/* Company Name */}
                <div className="form-group-create">
                  <label htmlFor="companyNameInput">Name: (required)
                    <span style={{
                      color: '#FF0000',
                    }}
                    > *</span>
                  </label>
                  <Field type="text" id="companyName" name="companyName" className="form-control" placeholder="Organization"  required  />

                <br/>
                <br/>
                {/* Company Type*/}
                  <label htmlFor="companyType">Company Type:</label>
                  <Field as="select" name="type" className="form-control" id="type" >
                    <option>Adoptor</option>
                    <option>Innovator</option>
                  </Field>
                  <br/>
                <br/>
                {/* Company Logo*/}
                
                    <label htmlFor="formControlFile1">Company Logo:</label>
                    <Field type="file" name="file" className="form-control-file" id="file" />
                  
                
                    <br/>
                <br/>
                {/* Company Status*/}
                  <label htmlFor="companyType">Sector:</label>
                  <Field as="select" name="companyType" className="form-control" id="status" >
                    <option value="oil-gas">Oil & Gas</option>
                    <option value="clean-energy">Clean Energy</option>
                  </Field>
                
                  <br/>
                <br/>
                {/* Company Stage*/}
                  <label htmlFor="companyStages">Development Stage:</label>
                  <Field as="select" name="stage" className="form-control" id="stage" >
                    <option value="seed">Seed and Development</option>
                    <option value="startup">Startup</option>
                    <option value="growth">Growth and Establishment</option>
                    <option value="expansion">Expansion</option>
                    <option value="maturity">Maturity</option>
                  </Field>
                
                  <br/>
                <br/>
                {/* Company Employees*/}
                  <label htmlFor="numberOfEmployees"># of Employees:</label>
                  <Field as="select" name="employees" className="form-control" id="employees" >
                    <option value="zero-ten">0-10 Employees</option>
                    <option value="eleven-fifty">11-50 Employees</option>
                    <option value="fiftyOne-hundred">51-100 Employees</option>
                    <option value="hundredPlus">100+ Employees</option>
                  </Field>

                  <br/>
                <br/>
                {/* Webiste URL*/}
                  <label htmlFor="websiteURL">Website</label>
                  <Field type="text" name="website" className="form-control" id="website" placeholder="Website URL" />
                
                <br/>
                {/* Disclaimer Check*/}
                <div className="form-check">
                <label id="disclaimer">
                  <Field className="form-check-input" name="check" type="checkbox"  value="" id="check" />
                    I verify that I am an authorized representative of this organization
                    and have the right to act on its behalf in the creation and management of this page.
                    The organization and I agree to the additional terms for Pages.
                  </label>
                  </div>

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
          </div>
        </main>
      

    </div>
  );
};
export default CreateCompany;