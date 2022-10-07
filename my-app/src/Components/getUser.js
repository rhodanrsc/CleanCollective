//This is an example of pulling data req.user
import { useState, useEffect } from "react";
import axios from "axios";


const GetUser = () => {

////////////////////////////////////////////////////////////////////////////////////
//COPY THIS AS A TEMPLATE INTO THE COMPONENTS THAT WILL USE THE USER DATA. MAKE SURE TO IMPORT useState AND useEffect in those pages. 
// Refer to the landing page as an example. 
////////////////////////////////////////////////////////////////////////////////////

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
//runs GetUser once when the page loads to set state variable data = req.user. 
useEffect(() => {
  getUser();
}, [""]);
////////////////////////////////////////////////////////////////////////////////////


};

export default GetUser;
