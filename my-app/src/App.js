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
import CreateUser from "./Components/registration/create-user.component";
// import CustomNavBar from "./Components/topNavBarComponent";
import CustomNavBar from "./Components/navbar/NavBar";
// import CustomNavCSS  from  "./css/topNavBar.css";
import CustomNavCSS from "./shared/css/topNavBar.css";
import UserLoginForm from "./Components/Login/user-login-form.component.js";
import ConfirmEmail from "./Components/registration/confirm-email.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <CustomNavBar />
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  {/* <Route exact path="/" element={<CreateStudent />} />
                  <Route path="/create-student" element={<CreateStudent />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                    <Route path="/student-list" element={<StudentList />} />*/}

                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/login" element={<UserLoginForm />} />
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
