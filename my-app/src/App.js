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
import CreateUser from "./Components/registration/create-user.component";
import CustomNavBar from "./Components/navbar/NavBar";
import UserLoginForm from "./Components/Login/user-login-form.component";
import LandingPage from "./Components/landingPage"
import ConfirmEmail from "./Components/registration/confirm-email.component";
import RegisterPage from "./Components/registration/create-user.component"

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
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/login" element={<UserLoginForm />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/confirmEmail" element={<ConfirmEmail />} />
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
