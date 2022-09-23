let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const usersPost = require("../models/users.post.model");

router.route("/").get((req, res) => {
  usersPost
    .find()
    .then((usersposts) => res.json(usersposts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  usersPost.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });

  //const companyName = req.body.postUserName;
  //Find the User object that has this name
  // User.User.find({ name: req.body.user })
  // .then(function (user) {
  //   //if returned, assign  that object to thisUser
  //   console.log("User Found: " + user);
  //   const newUserPost = new Company({
  //     companyName: companyName,
  //     //Make this part of the company
  //     user: user[0],
  //   });
  //   newUserPost
  //     .save()
  //     .then(() => res.json("User post added!" + user))
  //     .catch((err) => res.status(400).json("Error: " + err));
  // })
  // .catch((err) => res.status(400).json("Error: " + err));
});
//
// Old methods copy pasted from Students.
//They will need to be updated to use Atlas clusters.
// UPDATE student
router
  .route("/update-user.post/:id")
  // Get Single Student
  .get((req, res) => {
    userPostSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Student Data
  .put((req, res, next) => {
    userPostSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("User Post updated successfully!");
        }
      }
    );
  });

// Delete Student
router.delete("/delete-user.post/:id", (req, res, next) => {
  userPostSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
