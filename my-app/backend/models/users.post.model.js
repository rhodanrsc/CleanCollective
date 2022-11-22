const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPostSchema = new Schema(
  {
    postUserName: {
      type: String,
      required: false,
    },
    postTitle: {
      type: String,
      required: false,
    },
    postBody: {
      type: String,
      required: false,
    },
    postLikes: {
      type: Number,
      default: 0,
      required: false,
    },
    postDislikes: {
      type: Number,
      default: 0,
      required: false,
    },
    postUserProfilePic: {
      type: String, //We still need to figure out how to use images within Mongo DB
    },
    postSector: {
      type: [String],
      required: false,
    },
    userLikes: {
      type: [String],
      required: false
    }
  },
  {
    timestamps: true,
  }
);

const UserPostCollection = mongoose.model("UserPost", userPostSchema);

module.exports = { UserPostCollection, userPostSchema };
