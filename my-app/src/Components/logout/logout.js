import React from "react";
import axios from "axios";

const Logout = () => {
    const logout = () => {
        axios({
          method: "post",
          withCredentials: true,
          url: "http://localhost:5000/user/logout",
        }).then((res) => {

        }).catch((err) => alert("Something went wrong: " + err));
        };
  return (
    <div className="form-wrapper">
        <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
