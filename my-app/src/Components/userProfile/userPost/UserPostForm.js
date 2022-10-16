import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const UserPostForm = (props) => {
  const validationSchema = Yup.object().shape({
    postTitle: Yup.string().required("Required"),
  });

  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <Field
              name="postTitle"
              type="text"
              placeholder="Type catching attention title"
              className="form-control"
            />
            <ErrorMessage
              name="postTitle"
              className="d-block invalid-feedback"
              component={"span"}
            />

            <Field
              name="postSector"
              type="text"
              placeholder="Choose Categories"
              className="form-control"
            />
            <ErrorMessage
              name="postSector"
              className="d-block invalid-feedback"
              component={"span"}
            />

            <Field
              name="postBody"
              type="text"
              placeholder="Type your question"
              className="form-control"
            />
            <ErrorMessage
              name="postBody"
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

export default UserPostForm;
