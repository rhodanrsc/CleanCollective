import React from "react";
import logo from "../../shared/images/CCLogo.png";

import { Link } from "react-router-dom";

const NonUserNavBar = () => { return (
    <div className="navBar">
        <div className="homeButton navLogo">
            <a href="/">
                <img className="logo" alt="" src={logo}/>
            </a>
        </div>
        <div className="navbuttons">
            <Link to={"/login"}>
                <button className="loginButton" type="submit">Login</button>
            </Link>
        </div>
        <div className="navbuttons">
            <Link to={"/register"}>
                <button className="buttonGreenSmall" type="submit">Register</button>
            </Link>
        </div>
    </div>
)};

export default NonUserNavBar;