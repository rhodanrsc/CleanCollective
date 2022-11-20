const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyPostSchema = new Schema(
    {
        postCompanyName: {
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
        postCompanyProfilePic: {
            type: String, //We still need to figure out how to use images within Mongo DB
        },
        postSector: {
            type: [String],
            required: false,
        },
        companyLikes: {
            type: [String],
            required: false
        },
        accessLevel: {
            type: Boolean
        },
        anonymous: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

const CompanyPostCollection = mongoose.model("CompanyPost", companyPostSchema);

module.exports = { CompanyPostCollection, companyPostSchema };
