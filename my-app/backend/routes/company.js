const router = require("express").Router();
const Company = require("../models/company.model");
const Sector = require("../models/sector.model");
const trl = require("../models/trl.model");

router.route("/").get((req, res) => {
  Company.find()
    .then((companies) => res.json(companies))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const companyName = req.body.companyName;
  const file = req.body.file;
  const companyType = req.body.companyType;
  const employees = req.body.employees;
  const website = req.body.website;
  const check = req.body.check;

  let thisSector;
  let thisTRL;

  //Find the sector object that has this name
  Sector.SectorCollection.find({ name: req.body.sector })
    .then(function (foundSector) {
      //if returned, assign  that object to thisSector
      thisSector = foundSector[0]
      console.log("Sector Found: " + thisSector);

      trl.trlCollection.find({ stageName: req.body.developmentStage })
        .then(function (foundTRL) {
          //if returned, assign  that object to thisSector
          thisTRL = foundTRL[0]
          console.log("TRL Stage Found: " + foundTRL);

         
          const newCompany = new Company.CompanyCollection({
            companyName: companyName,
            //Make this part of the company
            sector: foundSector[0],
            trl: foundTRL[0],
            file: file,
            companyType: companyType,
            employees: employees,
            website: website,
            check: check,
          });

          newCompany
            .save()
            .then(() => res.json("Company added!" + foundSector))
            .catch((err) => res.status(400).json("Error: " + err));

        })
        .catch((err) => res.status(400).json("Error: " + err));

    })
    .catch((err) => res.status(400).json("Error: " + err));


});

module.exports = router;
