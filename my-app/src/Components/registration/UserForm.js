import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import {checkPassword, checkEmail, checkUsername, checkConfirmPassword} from "./registrationValidation";

const UserForm = (props) => {
  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().required("Required"),
  //   email: Yup.string().email("Invalid email").required("Required"),
  //   password: Yup.string().required("Required"),
  //   confirmPassword: Yup.string().required("Required")
  // });

  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validateOnChange={false} validateOnBlur={false} >
      {({ errors, touched, isValidating,values }) => (
        <Form>
          <FormGroup>
            {/* Username */}
            <label htmlFor="usernameID">Username</label>
            <Field id="usernameID" name="username" type="text" className="form-control" validate={checkUsername} />
            {<div style={{color: "red"}}>{errors.username}</div>}

            {/* Email */}
            <label htmlFor="emailID">Email</label>
            <Field id="emailID" name="email" type="text" className="form-control" validate={checkEmail} />
            {<div style={{color: "red"}}>{errors.email}</div>}
           
            {/* Password */}
            <label htmlFor="passwordID">Password</label>
            <Field id="passwordID" name="password" type="text" className="form-control" validate={checkPassword} />
            {<div style={{color: "red"}}>{errors.password}</div>}
            
            {/*Confirm password */}
            <label htmlFor="confirmPasswordID">Confirm Password</label>
            <Field id="confirmPasswordID" name="confirmPassword" type="text" className="form-control" validate={value =>
              checkConfirmPassword(values.password, value)
            }/>
            {<div style={{color: "red"}}>{errors.confirmPassword}</div>}
            
          </FormGroup>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      )}
      </Formik>
    </div>
  );
};

export default UserForm;
