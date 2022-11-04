const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trlSchema = new Schema({
  stageName: {
    type: String,
    required: false,
  },
  description: {
    type : String,
  }
},
{
  timestamps: true
});

const trlCollection = mongoose.model("trl", trlSchema);

module.exports = {trlCollection, trlSchema};
