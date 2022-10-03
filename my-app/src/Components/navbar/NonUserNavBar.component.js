import React from "react";
import logo from "../../shared/images/CCLogo.png";

import { Link } from "react-router-dom";

const NonUserNavBar = () => { return (
    <header>
        <div className="everything">
            <div className="homeButton navBar">
                <a href="/">
                    <img className="logo" src={logo}/>
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
    </header>
)};

export default NonUserNavBar;