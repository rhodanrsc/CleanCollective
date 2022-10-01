const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const developmentStageSchema = new Schema({
  stageName: {
    type: String,
    required: false,
  },
},
{
  timestamps: true
});

const DevelopmentStageCollection = mongoose.model("DevelopmentStage", developmentStageSchema);

module.exports = {DevelopmentStageCollection, developmentStageSchema};
