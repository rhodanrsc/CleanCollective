import axios from "axios";
const listOfCompanies = [];

const populateData = (data) => {listOfCompanies.push(data)};

function axiosGetUsers (populateData) {
    //Grabs an array of all users
    axios.get('http://localhost:5000/company/')
    .then(function(response){
        //uses populateData to fill the empty array
        populateData(response.data);
    })
    .catch(function(error){
        console.log(error);
    });

}

axiosGetUsers(populateData);

/*
Validates
1. not empty
2. does not already exist
*/
function checkCompany(companyName){
    //Check if email exists
    let error;
    if(!companyName){
        error = '*Required';
    } else{
        listOfCompanies[0].forEach(function (company) {
        //If even one matches. Return false
        if(company.companyName === companyName){
            error = "*Company already exist.";   
        }
        });
    }
    return error;
}


export {checkCompany}