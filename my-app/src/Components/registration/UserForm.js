import React from "react";
import { Formik, Form, Field} from "formik";
import { FormGroup, Button } from "react-bootstrap";
import {checkPassword, checkEmail, checkUsername, checkConfirmPassword} from "./registrationValidation";

const UserForm = (props) => {

  return (
    <div className="company-creation-background">
    <div className="border">

      <main>
        <h2 className="first-header">Join Clean Collective</h2>
        <br/>
        <div contentEditable="true" className="company-creation-description">Get more features and priviliges by <br/>joining to the most helpful community</div>
    <br/>



    <div className="form-wrapper">
      <Formik {...props} validateOnChange={false} validateOnBlur={false} >
      {({ errors, touched, isValidating,values }) => (
        <Form>
          <FormGroup>
            {/* Username */}
            
            <div className="form-group-register">
            <label htmlFor="usernameID">Username:</label>
            <Field id="usernameID" name="username" type="text" className="form-control" validate={checkUsername} />
            {<div style={{color: "red"}}>{errors.username}</div>}

            {/* Email */}
            <label htmlFor="emailID">Email:</label>
            <Field id="emailID" name="email" type="text" className="form-control" validate={checkEmail} />
            {<div style={{color: "red"}}>{errors.email}</div>}
           
            {/* Password */}
            <label htmlFor="passwordID">Password:</label>
            <Field id="passwordID" name="password" type="text" className="form-control" validate={checkPassword} />
            {<div style={{color: "red"}}>{errors.password}</div>}
            
            {/*Confirm password */}
            <label htmlFor="confirmPasswordID">Confirm Password:</label>
            <Field id="confirmPasswordID" name="confirmPassword" type="text" className="form-control" validate={value =>
              checkConfirmPassword(values.password, value)
            }/>
            {<div style={{color: "red"}}>{errors.confirmPassword}</div>}
            
            </div>
          </FormGroup>
          <Button className="registerButton" variant="success" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      )}
      </Formik>
    </div>
    </main>
    </div>
    </div>
  );
};

export default UserForm;
