const company = require('./company.model');
const userPost = require("./users.post.model");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmedAccount: {
        type: Boolean,
        default: false
    },
    associatedCompanies: {
        type: [company.companySchema]
    },
    posts :{
        type: [userPost.userPostSchema]
    },
    about :{
        type: String
    },
    likedPosts :{
        type: [String]
    },
    savedPosts :{
        type: [String]
    },
    tags :{
        type: [String]
    },
    job : {
        type: [String]
    },
    education : {
        type : [{
            institution : {type: String, default : ""},
            dateStarted : {type: Date, default: ""},
            dateEnded: {type: Date, default: ""},
            program: {type: String, default : ""},
            educationLevel: {type: String, default : ""},
        }],
        

    },
   
},
{
    timestamps: true
}

);


const UserCollection = mongoose.model("User",  userSchema);

module.exports = {UserCollection, userSchema};