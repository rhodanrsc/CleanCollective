const mongoose = require('mongoose');
const company = require("./company.model")

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
    },
    description : {
        type: String
    },
    image : {
        type : String
    },
    owner : {
        type : [company.companySchema]
    },
    tags : {
        type : [String]
    }

}, {
    timestamps : true
});

const ProductCollection = mongoose.model("Product", productSchema);

module.exports = {ProductCollection, productSchema};