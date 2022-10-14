import React, {useState, useEffect} from "react";
import axios from "axios";
import UserNavBar from "./userNavBar.component";
import NonUserNavBar from "./NonUserNavBar.component";



const NavBar = () => { 

    const [data, setData] = useState(null);
    const getUser = () => {
    axios({
    method: "get",
    withCredentials: true,
    url: "http://localhost:5000/user/getUser",
    }).then((res) => {
    setData(res.data);
    console.log(res.data);
    }).catch((err) => alert("Something went wrong: " + err));
    };

    //runs getUser once when the page loads to set state variable data = req.user. 
    useEffect(() => {
    getUser();
    }, [""]);

    if (data) {
        return <UserNavBar/>;
    } else {
        return <NonUserNavBar />;
    }

};

export default NavBar;

// Not fully implemented yet.
// Need to figure out how to know if someone is logged in