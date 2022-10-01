const router = require("express").Router();
const Company = require("../models/company.model");
const Sector = require("../models/sector.model");
const DevelopmentStage = require("../models/development.stages.model");

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
  let thisDevelopmentStage;

  //Find the sector object that has this name
  Sector.SectorCollection.find({ name: req.body.sector })
    .then(function (foundSector) {
      //if returned, assign  that object to thisSector
      thisSector = foundSector[0]
      console.log("Sector Found: " + thisSector);

      DevelopmentStage.DevelopmentStageCollection.find({ stageName: req.body.developmentStage })
        .then(function (foundDevelopmentStage) {
          //if returned, assign  that object to thisSector
          thisDevelopmentStage = foundDevelopmentStage[0]
          console.log("Development Stage Found: " + foundDevelopmentStage);

         
          const newCompany = new Company.CompanyCollection({
            companyName: companyName,
            //Make this part of the company
            sector: foundSector[0],
            developmentStage: foundDevelopmentStage[0],
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
