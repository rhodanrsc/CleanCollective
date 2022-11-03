const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagsSchema = new Schema(
  {
    tagsName: {
      type: String,
      required: true,
    },
    numberOfUses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TagsCollection = mongoose.model("Tags", tagsSchema);

module.exports = { TagsCollection, tagsSchema };
