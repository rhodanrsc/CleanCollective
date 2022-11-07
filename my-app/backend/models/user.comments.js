const user = require("./user.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userCommentSchema = new Schema(
  {
    commentUserId: {
      type: String,
      required: false,
    },
    commentBody: {
      type: String,
      required: false,
    },
    commentParentId: { //used to handle reply messages
      type: String,
      required: false,
    },
    commentCreated: { //store date and time of creation
      type: String,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserCommentCollection = mongoose.model("UserComment", userCommentSchema);

module.exports = { UserCommentCollection, userCommentSchema };
