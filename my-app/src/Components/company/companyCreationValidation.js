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


/*
Validates
1. checks if URL format is valid
*/
function checkWebsite(url){
    let error;
    var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    
    if(!r.test(url)){
        error = "*Incorrect URL format. Please check input."
    }
    return error;
}

/*
Validates
1. not empty
*/
function checkIfEmpty(input){
    let error;
    if(!input){
        error = "*Required"
    }
    return error;
}

/*
Validates
1. Checks which country is currently picked
2. checks format of postal or zip code depending on country
*/
const checkZIP = (country, zip) => {
    let error;
    console.log(country)
    var postalCodeRegex = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
    );
    var zipCodeRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    if(country === "Canada"){
        if (!postalCodeRegex.test(zip)){
            error = "*Invalid postal code format."
        }
    } else {
        if(!zipCodeRegex.test(zip)){
            error = "*Invalid zip code format."
        }
    }
    return error;
}

/*
Validates
1. If checked is true
*/
function checkDisclaimer(check){
    let error;
    if(!check){
        error = "*Terms not agreed."
    }
    return error;
}




export {checkCompany, checkWebsite, checkIfEmpty, checkZIP, checkDisclaimer}