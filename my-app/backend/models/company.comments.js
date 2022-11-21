const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyCommentSchema = new Schema(
    {
        // Use Mongo DB generated id 
        // Stores companyname of the person who wrote the comment
        commentCompanyname: {
            type: String,
        },
        // stores company that wrote the comment
        commentCompanyId: {
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

const CompanyCommentCollection = mongoose.model("CompanyComment", companyCommentSchema);

module.exports = { CompanyCommentCollection, companyCommentSchema };
