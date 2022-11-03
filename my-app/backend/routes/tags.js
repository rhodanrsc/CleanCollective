const router = require("express").Router();
const Tags = require("../models/tags.model");

router.route("/").get((req, res) => {
  Tags.TagsCollection.find()
    .then((tags) => res.json(tags))
    .catch((err) =>
      res.status(400).json("Error: Could not fetch Tags - " + err)
    );
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const new_tag = new Tags.TagsCollection({
    tagsName: name,
  });

  new_tag
    .save()
    .then(() => res.json("Tag added!"))
    .catch((err) => res.status(400).json("Error: Could not add tag - " + err));
});

module.exports = router;
