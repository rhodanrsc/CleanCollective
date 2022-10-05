import React from "react";
import { Link } from "react-router-dom";

const sidePanel = () => { return (
    <div className="panel">
        <div className="search">
            <input type="text" placeholder="Search"/>
        </div>
        <div className="menu">
            <Link to={"/forum"}>
                <a href="/" className="menuButton">Questions</a>
            </Link>
            <Link to={"/tags"}>
                <a href="/" className="menuButton">Tags</a>
            </Link>
            <Link to={"/ranking"}>
                <a href="/" className="menuButton">Ranking</a>
            </Link>
            <Link to={"/match"}>
                <a href="/" className="menuButton">Match Companies</a>
            </Link>
        </div>
        {/* <div className="social">

        </div> */}
    </div>
)};

export default sidePanel;