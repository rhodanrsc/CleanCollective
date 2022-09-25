import React from "react";
import logo from "../shared/images/CCLogo.png";

import { Link } from "react-router-dom";

const NonUserNavBar = () => { return (
    <header>
        <div className="everything">
            <div className="homeButton navBar">
                <a href="/">
                    <img className="logo" alt='' src={logo}/>
                </a>
            </div>
            <div className="login buttons">
                <Link to={"/create-company"} className="nav-link">
                    <button className="loginButton" type="submit">Login</button>
                </Link>
            </div>
            <div className="register buttons">
                <Link to={"/create-company"} className="nav-link">
                    <button className="registerButton" type="submit">Register</button>
                </Link>
            </div>
        </div>
    </header>
)};

export default NonUserNavBar;