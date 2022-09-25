import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const UserForm = (props) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
  });

  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
          {/* Username */}
          <label htmlFor="usernameID">Username</label>
            <Field id="usernameID" name="username" type="text" className="form-control" />
            <ErrorMessage
              name="username"
              className="d-block invalid-feedback"
              component={"span"}
            />
            {/* Email */}
            <label htmlFor="emailID">Email</label>
            <Field id="emailID" name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component={"span"}
            />
            {/* Password */}
            <label htmlFor="passwordID">Password</label>
            <Field id="passwordID" name="password" type="text" className="form-control" />
            <ErrorMessage
              name="password"
              className="d-block invalid-feedback"
              component={"span"}
            />

            {/*Confirm password */}
            <label htmlFor="confirmPasswordID">Confirm Password</label>
            <Field id="confirmPasswordID" name="confirmPassword" type="text" className="form-control" />
            <ErrorMessage
              name="confirmPassword"
              className="d-block invalid-feedback"
              component={"span"}
            />
            
          </FormGroup>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
