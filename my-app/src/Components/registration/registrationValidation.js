import emailValidator from "email-validator";
import axios from "axios";

/* 
listOfUsers, populateData, and axiosGetUsers 
work together to return a list of users
*/
const listOfUsers = [];
const populateData = (data) => {listOfUsers.push(data)};

function axiosGetUsers (populateData) {
    axios.get('http://localhost:5000/user/')
    .then(function(response){
        populateData(response.data);
    })
    .catch(function(error){
        console.log(error);
    });

}

axiosGetUsers(populateData);

const checkPassword = values => {
  let error = "";
  const passwordRegex = /(?=.*[0-9])/;
  if (!values) {
    error = "*Required";
  } else if (values.length < 8) {
    error = "*Password must be 8 characters long.";
  } else if (!passwordRegex.test(values)) {
    error = "*Invalid password. Must contain one number.";
  }
  return error;
};


const checkConfirmPassword = (pass, value) => {

  let error = "";
  if(!value){
    error = "*Required";
  } else if (pass !== value){
    error = "*Passwords do not match";
  }
  return error;
};

/*
Validates
1. input is not empty
2. valid email format 
3. email isnt already in use
*/
function checkEmail(email){
    let error;
    let validEmail =  emailValidator.validate(email); 
    if(!email){
        error = '*Required';
    } else if (validEmail === false){
        error = '*Invalid email format';
    } else{
        //Check if email exists
        listOfUsers[0].forEach(function (user) {
        //If even one matches. Return false
        if(user.email === email){
            error = '*This email is already in use'
                
        }
    });

    }

    

    return error;

    //Check if email already exist
}


function checkUsername(username){
    //Check if email exists
    let error;
    if(!username){
        error = '*';
    } else{
        listOfUsers[0].forEach(function (user) {
        //If even one matches. Return false
        if(user.username === username){
            error = "*Username is already in use";   
        }
        });
    }
    

    return error;
}

export {checkPassword, checkEmail, checkUsername, checkConfirmPassword};