import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserLoginForm = (props) => {
  const validationSchema = Yup.object().shape({
    // password: Yup.string().required("Required"),
  });




  console.log(props);
  return (

    
    
    <div className="form-group">
      <h2 className="first-header">Welcome Back!</h2>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
          <div className="form-group-login">
            <label htmlFor="login_email_feild">Email: </label>
            <Field
              id="email"
              name="login_email_feild"
              type="text"
              className="form-control"
            />
            <ErrorMessage
              name="login_email_feild"
              className="d-block invalid-feedback"
              component={"span"}
            />
            <br/>
            <br/>
            </div>
            <div className="form-group-login">
            <label htmlFor="login_password_feild">Password: </label>
            <Field
              id="password"
              name="login_password_feild"
              type="password"
              className="form-control"
            />
            <ErrorMessage
              name="login_password_feild"
              className="d-block invalid-feedback"
              component={"span"}
            />
            </div>
            <br/>
            <br/>
          </FormGroup>
          <Button
           className="logButton" variant="danger" size="lg" block="block" name="logButton"
            // onClick={""}
            type="submit"><span>Login</span>{props.children}</Button>

          <div className="login_links">
            <p>
              <Link to={"/create-user"}>Register Now</Link>
            </p>
            <p>
              <Link to={""}>Forgot Password?</Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
    </main>
    </div>
    </div>
  );
};

export default UserLoginForm;
