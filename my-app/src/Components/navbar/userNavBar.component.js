import React from "react";
import logo from "../../shared/images/CCLogo.png";

const UserNavBar = () => { return (
    <header>
        <div className="everything">
            <div className="homeButton navBar">
                <a href="/forum">
                    <img className="logo" src={logo}/>
                </a>
            </div>
            <div className="navbuttons">
                Work in progress
            </div>
        </div>
    </header>
)};

export default UserNavBar;