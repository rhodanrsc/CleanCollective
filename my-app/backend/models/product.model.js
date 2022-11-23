const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    owner: {
        type: {
            ownerID: String,
            ownerName: String
        }
    },
    tags: {
        type: [String]
    }

}, {
    timestamps: true
});

const ProductCollection = mongoose.model("Product", productSchema);

module.exports = { ProductCollection, productSchema };