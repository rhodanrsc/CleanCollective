const router = require('express').Router();
const DevelopmentStage = require('../models/development.stages.model');


router.route('/').get((req, res) => {
    DevelopmentStage.DevelopmentStageCollection.find()
    .then(developmentStages => res.json(developmentStages))
    .catch(err => res.status(400).json('Error: Could not fetch Develop Stages - ' + err));
});

router.route('/add').post((req, res) => {
    const stageName = req.body.stageName;
    const new_developmentStage = new DevelopmentStage.DevelopmentStageCollection({
        stageName : stageName
    });

    new_developmentStage.save()
    .then(() => res.json('Development Stage added!'))
    .catch(err => res.status(400).json('Error: Could not add development stage - ' + err));
});

module.exports = router;