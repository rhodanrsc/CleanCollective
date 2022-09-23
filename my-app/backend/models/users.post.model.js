const sector = require("./sector.model");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userPostSchema = new Schema({
  postUserName: {
    type: String,
  },
  postUserProfilePic: {
    type: String, //We still need to figure out how to use images within Mongo DB
  },
  postBody: {
    type: String,
    required: false,
  },
  postLikes: {
    type: Number,
    required: false,
  },
  postDislikes: {
    type: Number,
    required: false,
  },
});

const UserPost = mongoose.model("UserPost", userPostSchema);

module.exports = UserPost;
