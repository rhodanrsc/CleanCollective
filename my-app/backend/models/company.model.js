const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    companyID: {
        type: Number,
        unique: true
    },
    
    numberOfEmployees: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    logo: {
        data: Buffer,
        contentType: String
    },
    typeOfCompany: {
        type: String
    },
    sector:{
        type: String
    },
    yearFounded: {
        type: Number
    },
    website: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    zip: {
        type: String
    },
    province: {
        type: String
    },
    country: {
        type: String
    },
    revenueRangeMin: {
        type: Number
    },
    revenueRangeMax: {
        type: Number
    },
    objective: {
        type: String
    } 
}, 
{
    timestamps: true,
});

const Company = mongoose.model("Company",  companySchema);

module.exports = Company;