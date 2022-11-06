const sector = require("./sector.model");
const trl = require("./trl.model");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  sector: {
    type: sector.sectorSchema,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  companyType:{
    type: String,
    required: false,
  },
  trl:{
    type: trl.trlSchema,
    required: true,
  },
  rangeOfEmployees:{
    type : {
      minNumOfEmployees : Number,
      maxNumOfEmployees : Number
    },
    required: false,
  },
  website:{
    type: String,
    required: false,
  },
  check:{
    type: Boolean,
    default: false, 
    required: false,
  },
  location: {
    type: {
      address : String,
      city : String,
      province : String,
      country : String,
      zip : String
    }
  }
  
},
{
  timestamps: true
});

const CompanyCollection = mongoose.model("Company", companySchema);

module.exports = {CompanyCollection, companySchema};
