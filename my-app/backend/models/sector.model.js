const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectorSchema = new Schema({
    name:{
        type: String
    }
});


const Sector = mongoose.model("Sector",  sectorSchema);

module.exports = Sector;