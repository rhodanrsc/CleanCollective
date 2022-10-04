import React from "react";
import { Formik, Form, Field } from "formik";
import { FormGroup, Button } from "react-bootstrap";


const EditUserForm = (props) => {

  return (
    <div className="form-wrapper">
      <Formik {...props} validateOnChange={false} validateOnBlur={false} >
      {({ errors, touched, isValidating,values }) => (
        <Form>
          <FormGroup>
            {/* Username */}
            <label htmlFor="edit_usernameID">Username</label>
            <Field id="edit_usernameID" name="edit_username" type="text" className="form-control"  />
            {<div style={{color: "red"}}>{errors.username}</div>}

            {/* Email */}
            <label htmlFor="edit_emailID">Email</label>
            <Field id="edit_emailID" name="edit_email" type="text" className="form-control"  />
            {<div style={{color: "red"}}>{errors.email}</div>}
           
            {/* Password */}
            <label htmlFor="edit_passwordID">Password</label>
            <Field id="edit_passwordID" name="edit_password" type="password" className="form-control" />
            {<div style={{color: "red"}}>{errors.password}</div>}
            
            {/*Confirm password */}
            <label htmlFor="confirmPasswordID">Confirm Password</label>
            <Field id="confirmPasswordID" name="confirmPassword" type="password" className="form-control" />
            {<div style={{color: "red"}}>{errors.confirmPassword}</div>}
            
          </FormGroup>
          <Button variant="success" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      )}
      </Formik>
    </div>
  );
};

export default EditUserForm;
