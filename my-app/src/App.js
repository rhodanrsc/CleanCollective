// Import React
import React from "react";
import { useMediaQuery } from "react-responsive";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";
import "./shared/css/style.css";
import "./shared/css/createCompany.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import CreateUser from "./Components/registration/create-user.component";
import CustomNavBar from "./Components/navbar/NavBar";
import UserLoginForm from "./Components/Login/user-login-form.component";
import LandingPage from "./Components/landingPage"
import ConfirmEmail from "./Components/registration/confirm-email.component";
import RegisterPage from "./Components/registration/create-user.component"
import CompanyCreation from "./Components/company/create-company-components";

import { Desktop } from "./Components/desktop/desktop.component";
import { Laptop } from "./Components/laptop/laptop.component";
import { BigScreen } from "../src/Components/big-screen/big-screen.component";
import { Mobile } from "../src/Components/mobile/mobile.component";
import { TabletMobile } from "../src/Components/tablet-mobile/tablet-mobile.component";



// App Component
const App = () => {

  const isMobileDevice = useMediaQuery({
    query: "(min-device-width: 480px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1200px)",
  });

  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 1201px )",
  });

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
                <div className="App">
                  <h1>React Responsive - a guide</h1>
                  {isMobileDevice && <Mobile />}
                  {isTabletDevice && <><TabletMobile />
                  {isDesktop && <Desktop />}
                  {isLaptop && <Laptop />}
                  {isBigScreen && <BigScreen />}
                  </>}
                </div>
                <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/login" element={<UserLoginForm />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/confirmEmail" element={<ConfirmEmail />} />
                  <Route path="/companyCreation" element={<CompanyCreation />} />
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
