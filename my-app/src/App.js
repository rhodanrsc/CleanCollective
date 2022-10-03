// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";
import "./shared/css/style.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
<<<<<<< HEAD
import CreateStudent from "./Components/create-student.component";
import EditStudent from "./Components/edit-student.component";
import StudentList from "./Components/student-list.component";
import CreateCompany from "./Components/registration/create-company.component";
import CustomNavBar from "./Components/topNavBarComponent";
import CreateUserPost from "./Components/UserProfile/create-user-post.component";
import CustomNavCSS from "./css/topNavBar.css";
=======
import CreateUser from "./Components/registration/create-user.component";
import CustomNavBar from "./Components/navbar/NavBar";
import UserLoginForm from "./Components/Login/user-login-form.component";
import LandingPage from "./Components/landingPage"
import ConfirmEmail from "./Components/registration/confirm-email.component";
import RegisterPage from "./Components/registration/create-user.component"
>>>>>>> 361033436e49acaade5c22a381cdd220fd6b7799

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
          {/* <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-student"} className="nav-link">
                  React MERN Stack App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-student"} className="nav-link">
                    Create Student
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/student-list"} className="nav-link">
                    Student List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/create-company"} className="nav-link">
                    Create Company
                  </Link>
                </Nav>

              </Nav>
            </Container>
          </Navbar> */}
=======
>>>>>>> 361033436e49acaade5c22a381cdd220fd6b7799
          <CustomNavBar />
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
<<<<<<< HEAD
                  <Route exact path="/" element={<CreateStudent />} />
                  <Route path="/create-student" element={<CreateStudent />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                  <Route path="/student-list" element={<StudentList />} />
                  <Route path="/create-company" element={<CreateCompany />} />
                  <Route
                    path="/create-user-post"
                    element={<CreateUserPost />}
                  />
=======
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/login" element={<UserLoginForm />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/confirmEmail" element={<ConfirmEmail />} />
>>>>>>> 361033436e49acaade5c22a381cdd220fd6b7799
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
