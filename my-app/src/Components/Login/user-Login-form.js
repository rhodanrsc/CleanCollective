import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const UserLoginForm = (props) => {
  const validationSchema = Yup.object().shape({
    
   // password: Yup.string().required("Required"),
  });

  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor="login_email_feild">Email: </label>
            <Field id="email" name="login_email_feild" type="text" className="form-control" />
            <ErrorMessage
              name="login_email_feild"
              className="d-block invalid-feedback"
              component={"span"}
            />
            <label htmlFor="login_password_feild">Password: </label>
            <Field id="password" name="login_password_feild" type="password" className="form-control" />
            <ErrorMessage
              name="login_password_feild"
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

export default UserLoginForm;