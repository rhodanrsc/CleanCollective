import React  from "react";
import NonUserNavBar from "./NonUserNavBar.component";
import SidePanel from '../side/panel';
import { ReactSession } from 'react-client-session';


export default function NavBar ()  { 
    
    let userSession = ReactSession.get("userSession")

    return (
        <div>
            {userSession ? <SidePanel/> : <NonUserNavBar />}
        </div>
        
    )

 

};


// Not fully implemented yet.
// Need to figure out how to know if someone is logged in