import axios from "axios";

  let userSession;

  const populateUserSession = (data) =>{
     userSession = data;
  }

  const getUser = () => {
   
  axios({
    method: "get",
    withCredentials: true,
    url: "http://localhost:5000/user/getUser",
  }).then((res) => {
    populateUserSession(res.data);
  }).catch((err) => alert("Something went wrong: " + err));

  return userSession;
};

export default getUser;
