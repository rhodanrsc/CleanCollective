import React from "react";
import logo from "./CCLogo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header>
      <div className="everything">
        <div className="homeButton navBar">
          <a href="/">
            <img className="logo" src={logo} />
          </a>
        </div>
        <div className="login buttons">
          <Link to={"/create-company"}>
            <form>
              <button className="loginButton" type="submit">
                Login
              </button>
            </form>
          </Link>
        </div>
        <div className="register buttons">
          <Link to={"/create-company"}>
            <form method="post" action="/">
              <button className="registerButton" type="submit">
                Register
              </button>
            </form>
          </Link>
        </div>
        <div className="register buttons">
          <Link to={"/create-user-post"}>
            <form method="post" action="/">
              <button className="registerButton" type="submit">
                Create User Post
              </button>
            </form>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
