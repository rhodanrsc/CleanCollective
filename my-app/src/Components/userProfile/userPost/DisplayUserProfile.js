import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const CompanyForm = (props) => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Required"),
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
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CompanyForm;
