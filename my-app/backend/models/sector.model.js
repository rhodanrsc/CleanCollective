const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectorSchema = new Schema({
    name:{
        type: String,
        required: true
    }
});


const SectorCollection = mongoose.model("Sector",  sectorSchema);

module.exports = {SectorCollection, sectorSchema};
