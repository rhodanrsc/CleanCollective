const router = require('express').Router();
const Company = require('../models/company.model');
const Sector = require('../models/sector.model');


router.route('/').get((req, res) => {
    Company.find()
        .then(companies => res.json(companies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const companyName = req.body.companyName;
    
    let thisSector;
    //Find the sector object that has this name
    Sector.Sector.find({name: req.body.sector})
    .then(function(sector){
        //if returned, assign  that object to thisSector
        thisSector = sector
        console.log("Sector Found: " + thisSector);
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
    const newCompany = new Company({
        companyName,
        //Make this part of the company
        thisSector
    });

    newCompany.save()
    .then(() => res.json('Company added!' + thisSector))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;