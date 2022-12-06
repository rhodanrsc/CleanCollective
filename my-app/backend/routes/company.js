const router = require("express").Router();
const Company = require("../models/company.model");
const Sector = require("../models/sector.model");
const trl = require("../models/trl.model");
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  Company.CompanyCollection.find()
    .then((companies) => res.json(companies))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getCompany/:companyName").get((req, res) => {
  Company.CompanyCollection.findOne({ companyName: req.params.companyName })
    .then((company) => res.json(company))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*
Saves a new company
adds company to user's list of associated companies
adds user to the companies members list.
*/
router.route("/add/:id").post((req, res) => {
  const companyName = req.body.companyName;
  const file = req.body.file;
  const companyType = req.body.companyType;
  const rangeOfEmployees = {
    minNumOfEmployees: req.body.employeeMin,
    maxNumOfEmployees: req.body.employeeMax,
  };
  const website = req.body.website;
  const check = req.body.check;
  const location = {
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    zip: req.body.zip,
  };
  const yearFounded = req.body.yearFounded;
  const companyInformation = {
    statement: req.body.statement,
    about: req.body.about,
    interest: req.body.interest,
    tags: req.body.tags,
  };


  let thisSector;

  //Find the sector object that has this name
  Sector.SectorCollection.find({ name: req.body.sector })
    .then(function (foundSector) {
      //if returned, assign  that object to thisSector
      thisSector = foundSector[0];
      console.log("Sector Found: " + thisSector);

      //Find the trl object that has this name
      trl.trlCollection
        .find({ stageName: req.body.trl })
        .then(function (foundTRL) {
          User.UserCollection.findById(req.params.id).then((user) => {
            let thisTRL;
            let today = new Date()
            //if returned, assign  that object to thisTRL
            thisTRL = foundTRL[0];

            //Assigning the current user as a member
            let memberList = [];
            let member = {
              memberName: user.username,
              memberID: user._id.toString(),
              dateJoined: today
            };
            memberList.push(member);

            const newCompany = new Company.CompanyCollection({
              companyName: companyName,
              //Make this part of the company
              sector: foundSector[0],
              trl: thisTRL,
              file: file,
              companyType: companyType,
              rangeOfEmployees: rangeOfEmployees,
              website: website,
              check: check,
              location: location,
              members: memberList,
              yearFounded: yearFounded,
              companyInformation: companyInformation
            });

            //Save newCompany to the users list of associated companies
            user.associatedCompanies.push(newCompany);
            user
              .save()
              .then(console.log("Company saved to user"))
              .catch((err) =>
                res
                  .status(400)
                  .json("Error: Could not add company to user - " + err)
              );

            //Save company into company collection
            newCompany
              .save()
              .then(() => res.json(newCompany))
              .catch((err) =>
                res.status(400).json("Error: With saving company" + err)
              );
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
