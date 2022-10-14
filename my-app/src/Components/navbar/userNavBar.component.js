import React from "react";
import logo from "../../shared/images/CCLogo.png";
import {Link} from "react-router-dom"
import Logout from "../logout/logout"

const UserNavBar = () => { return (
    <header>
        <div className="navBar loggedIn">
            <div className="homeButton navLogo">
                <a href="/forum">
                    <img className="logo" src={logo}/>
                </a>
            </div>
            <div className="navbuttons">
                <ul className="navDropDown">
                    <li>
                        <Link to={"/login"} className="nav-link getStarted"><Logout></Logout></Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
)};

export default UserNavBar;