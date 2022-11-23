const sector = require("./sector.model");
const trl = require("./trl.model");
const product = require("./product.model")
const companyPost = require("./company.post.model")
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  sector: {
    type: sector.sectorSchema,

  },
  file: {
    type: String,
    required: false,
  },
  companyType: {
    type: String,
    required: false,
  },
  trl: {
    type: trl.trlSchema,

  },
  rangeOfEmployees: {
    type: {
      minNumOfEmployees: Number,
      maxNumOfEmployees: Number
    },
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  check: {
    type: Boolean,
    default: false,
    required: false,
  },
  location: {
    type: {
      address: String,
      city: String,
      province: String,
      country: String,
      zip: String
    }
  },
  products: {
    type: [product.productSchema]
  },
  members: {
    type: [{
      memberName: String,
      memberID: String,
      dateJoined: Date,
      role: String
    }]
  },
  yearFounded: {
    type: Number,
  },
  companyInformation: {
    statement: String,
    about: String,
    interest: [String],
    tags: [String]
  },
  followers: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  posts: {
    type: [companyPost.companyPostSchema]
  },
  likedPosts: {
    type: [String]
  },
  savedPosts: {
    type: [String]
  }


},
  {
    timestamps: true
  });

const CompanyCollection = mongoose.model("Company", companySchema);

module.exports = { CompanyCollection, companySchema };
