const router = require('express').Router();
const Sector = require('../models/sector.model');


router.route('/').get((req, res) => {
    Sector.SectorCollection.find()
    .then(sectors => res.send(sectors))
    .catch(err => res.status(400).json('Error: Could not fetch Sectors - ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const new_sector = new Sector.SectorCollection({
        name : name
    });

    new_sector.save()
    .then(() => res.json('Sector added!'))
    .catch(err => res.status(400).json('Error: Could not add sector - ' + err));
});

module.exports = router;