import React from "react";

import UserNavBar from "./userNavBar.component";
import NonUserNavBar from "./NonUserNavBar.component";

const isLoggedIn = false;

const NavBar = () => { 
    
    if (isLoggedIn) {
        return <UserNavBar />;
    } else {
        return <NonUserNavBar />;
    }
};

export default NavBar;

// Not fully implemented yet.
// Need to figure out how to know if someone is logged in