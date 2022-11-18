const user = require("./user.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userCommentSchema = new Schema(
  {
    // Use Mongo DB generated id 
    // Stores username of the person who wrote the comment
    commentUsername: {
      type: String,
    },
    // stores user that wrote the comment
    commentUserId: {
      type: String,
      required: false,
    },
    // postId that the comment is written on
    commentPostId: {
      type: String,
    },
    commentBody: {
      type: String,
      required: false,
    },
    // used to store the ID that the comment is replying to 
    commentParentId: { 
      type: String,
      required: false,
    },
  },
  // generates createdAt and updatedAt fields which store an ISO string
  {
    timestamps: true,
  }
);

const UserCommentCollection = mongoose.model("UserComment", userCommentSchema);

module.exports = { UserCommentCollection, userCommentSchema };
