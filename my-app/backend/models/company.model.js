const sector = require('./sector.model');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const companySchema = new Schema({
    companyName:{
        type: String,
        required: true
    },
    sector: {
        type: sector.sectorSchema
    
    }
});


const Company = mongoose.model("Company",  companySchema);

module.exports = Company;