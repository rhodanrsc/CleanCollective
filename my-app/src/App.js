// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import CreateStudent from "./Components/create-student.component";
import EditStudent from "./Components/edit-student.component";
import StudentList from "./Components/student-list.component";
import CreateUser from "./Components/registration/create-user.component";
// import CustomNavBar from "./Components/topNavBarComponent";
import CustomNavBar from "./Components/NavBar";
// import CustomNavCSS  from  "./css/topNavBar.css";
import CustomNavCSS  from  "./shared/css/topNavBar.css";
import UserLoginForm from "./Components/Login/user-login-form.component.js";
import ConfirmEmail from "./Components/registration/confirm-email.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
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
          <CustomNavBar /> 
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<CreateStudent />} />
                  <Route path="/create-student" element={<CreateStudent />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                  <Route path="/student-list" element={<StudentList />} />
                  <Route path="/registered" element={<ConfirmEmail />} />
                  <Route path="/create-user" element={<CreateUser/>}/>
                  <Route path="/login" element={<UserLoginForm />}/>
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
