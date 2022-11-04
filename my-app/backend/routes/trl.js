const router = require('express').Router();
const trl = require('../models/trl.model');


router.route('/').get((req, res) => {
    trl.trlCollection.find()
    .then(trlStages => res.json(trlStages))
    .catch(err => res.status(400).json('Error: Could not fetch trl Stages - ' + err));
});

router.route('/add').post((req, res) => {
    const stageName = req.body.stageName;
    const description = req.body.description;
    const newTRL = new trl.trlCollection({
        stageName : stageName,
        description : description
    });

    newTRL.save()
    .then(() => res.json('TRL Stage added!'))
    .catch(err => res.status(400).json('Error: Could not add TRL stage - ' + err));
});

module.exports = router;