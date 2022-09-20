import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const CompanyForm = (props) => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Required"),
    companyStatus: Yup.string()
      .positive("You have enter an invalid company status")
      .required("Required"),
    numberOfEmployees: Yup.number()
      .positive("Invalid employee number")
      .integer("Invalid employee number")
      .required("Required"),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <Field name="companyName" type="text" className="form-control" />
            <ErrorMessage
              name="companyName"
              className="d-block invalid-feedback"
              component={"span"}
            />
          </FormGroup>
          <FormGroup>
            <Field name="companyStatus" type="text" className="form-control" />
            <ErrorMessage
              name="companyStatus"
              className="d-block invalid-feedback"
              component={"span"}
            />
          </FormGroup>
          <FormGroup>
            <Field name="numberOfEmployees" type="number" className="form-control" />
            <ErrorMessage
              name="numberOfEmployees"
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


export default CompanyForm;
