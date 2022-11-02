import React from "react";
import UserNavBar from "./userNavBar.component";
import NonUserNavBar from "./NonUserNavBar.component";
import { ReactSession } from 'react-client-session';


export default function NavBar ()  { 
    
    let userSession = ReactSession.get("userSession")

    return (
        <div>
            {userSession ? <UserNavBar/> : <NonUserNavBar />}
        </div>
        
    )

 

};


// Not fully implemented yet.
// Need to figure out how to know if someone is logged in