const sector = require("./sector.model");
const DevelopmentStage = require("./development.stages.model");
const mongoose = require("mongoose");

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
  developmentStage:{
    type: DevelopmentStage.developmentStageSchema,
    required: true,
  },
  employees:{
    type: String,
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
  }
  
},
{
  timestamps: true
});

const CompanyCollection = mongoose.model("Company", companySchema);

module.exports = {CompanyCollection, companySchema};
