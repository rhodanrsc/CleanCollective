import React from "react";
import logo from "./../shared/images/CCLogo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const NavBar = () => { return (
    <header>
        <div className="everything">
            <div className="homeButton navBar">
                <a href="/">
                    <img className="logo" src={logo}/>
                </a>
            </div>
            <div className="login navbuttons">
                <Link to={"/login"}>
                    <button className="loginButton" type="submit">Login</button>
                </Link>
            </div>
            <div className="register navbuttons">
                <Link to={"/register"}>
                    <button className="buttonGreenSmall" type="submit">Register</button>
                </Link>
            </div>
        </div>
    </header>
)};

export default NavBar;