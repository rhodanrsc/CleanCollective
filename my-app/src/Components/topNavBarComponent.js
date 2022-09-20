import React from "react";
import logo from "./CCLogo.png";

const NavBar = () => { return (
    <header>
        <div className="everything">
            <div className="homeButton navBar">
            <a href="/">
                <img className="logo" src={logo}/>
            </a>
        </div>
        <div className="login buttons">
            <form method="post" action="/">
                <button className="loginButton" type="submit">Login</button>
            </form>
        </div>
        <div className="register buttons">
            <form method="post" action="/">
                <button className="registerButton" type="submit">Register</button>
            </form>
        </div>
        </div>
        
    </header>
)};

export default NavBar;