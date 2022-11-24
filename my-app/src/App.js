// Import React
import React from "react";

// Import Bootstrap
import { Container, Row, Col } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";
import "./shared/css/style.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import other React Component
import CreateUser from "./Components/registration/create-user.component";
import CustomNavBar from "./Components/navbar/NavBar";
import UserLoginForm from "./Components/Login/user-login-form.component";
import LandingPage from "./Components/landingPage";
import ConfirmEmail from "./Components/registration/confirm-email.component";
import RegisterPage from "./Components/registration/create-user.component"
import CompanyCreation from "./Components/company/Create_Company_Form/create-company-components";
import LikedPosts from "./Components/Posts/LikedPosts/liked-post-page"
import SavedPosts from "./Components/Posts/SavedPosts/saved-post-page"
import EditUser from "./Components/userProfile/editUser/edit-user.component";
import CreatePost from "./Components/userPosts/create_user_post.component";
import { ReactSession } from "react-client-session";
//Main Form
import PostPage from "./Components/Posts/main-post-page";
import CompanyPage from "./Components/company/Company_Page/company_page.component"

ReactSession.setStoreType("sessionStorage");
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
                  <Route
                    path="/register/confirmEmail"
                    element={<ConfirmEmail />}
                  />
                  <Route path="/editUser" element={<EditUser />} />
                  <Route path="/LikedPosts" element={<LikedPosts />} />
                  <Route path="/LikedPosts/:searchValue" element={<LikedPosts />} />
                  <Route path="/SavedPosts" element={<SavedPosts />} />
                  <Route path="/SavedPosts/:searchValue" element={<SavedPosts />} />
                  <Route path="/createPost" element={<CreatePost />} />
                  <Route path="/forum" element={<PostPage />} />
                  <Route path="/forum/:searchValue" element={<PostPage />} />
                  <Route path="/CreateCompany" element={<CompanyCreation />} />
                  <Route path="/companyPage/:companyName" element={<CompanyPage />} />

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