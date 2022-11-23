import React from "react";
import provinceList from "provinces";


const createProvinceList = (typeCountry) => {
    let provinceArray = [];
    let stateArray = [];

    //Filters through countries
    provinceList.map(function (country) {
        if (country.country === "US") {
            stateArray.push(country.name);
        } else if (country.country === "CA") {
            provinceArray.push(country.name);
        }
    });
    //Return state/province array depending on current value of country
    if (typeCountry === "Canada") {
        return provinceArray;
    } else {
        return stateArray;
    }
};


const createYears = () => {
    let listOfYears = [];
    for (let i = 1800; i <= 2022; i++) {
        listOfYears.push(i);
    }
    return listOfYears;
};


export { createYears, createProvinceList }