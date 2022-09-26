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

//Validation Methods
function checkPassword(password, confirmPassword){
    //Will add regex here at some point
    console.log(password, confirmPassword)
    if(password === confirmPassword){
        return true;
    } else{
        alert('Passwords do not match');
        return false;
    }
}

function checkEmail(email){
    //Check if email is valid
    let existEmail = true;
    let validEmail =  emailValidator.validate(email); 
    if(validEmail === false){
        alert('Invalid Email');
        validEmail = false;
    } else{
        validEmail = true;
    }

    //Check if email exists
    listOfUsers[0].forEach(function (user) {
        //If even one matches. Return false
        if(user.email === email){
            existEmail = false;
            alert("Email already exists");
                
        }
    });

    return (validEmail && existEmail)

    //Check if email already exist
}


function checkUsername(username){
    //Check if email exists
    let userExists = true;
    listOfUsers[0].forEach(function (user) {
        //If even one matches. Return false
        if(user.username === username){
            userExists = false;
            alert("Username already exists");
                
        }
    });

    return userExists;
}

export {checkPassword, checkEmail, checkUsername};