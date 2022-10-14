import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SidePanel = () => { 
    
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
        return (
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
        )
    }
};

export default SidePanel;