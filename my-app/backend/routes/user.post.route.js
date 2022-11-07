const router = require("express").Router();
const usersPost = require("../models/users.post.model");
const User = require("../models/user.model");
const Sector = require("../models/sector.model");

router.route("/").get((req, res) => {
  usersPost.UserPostCollection.find()
    .then((usersposts) => res.json(usersposts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/addPost/:id")
  .post((req, res) => {
    //Find the user
    User.UserCollection.findById(req.params.id).then((user) => {
      //If this user is found. Create a post

      const thisPostUsername = user.username;
      const thisPostTitle = req.body.postTitle;
      const thisPostBody = req.body.postBody;
      const thisPostLikes = req.body.postLikes;
      const thisPostDislikes = req.body.postDislikes;
      const thisSector = req.body.sector;

      //Create a new Post Object
      const newPost = new usersPost.UserPostCollection({
        postUserName: thisPostUsername,
        postTitle: thisPostTitle,
        postBody: thisPostBody,
        postSector: thisSector,
        postLikes: thisPostLikes,
        postDislikes: thisPostDislikes,
      });

      //Saves to main post collection
      newPost
        .save()
        .then(function () {
          //Adds to thisUsers Array of Posts
          user.posts.push(newPost);
          //Update users new Array
          user
            .save()
            .then(() =>
              res.json("Post added to " + user.username + " post array")
            )
            .catch((err) =>
              res
                .status(400)
                .json("Error: Could not add post to post array  - " + err)
            );
        })
        .catch((err) =>
          res
            .status(400)
            .json("Error: Could not add posts to Post Collection - " + err)
        );
    });
  })


  router.route("/getPost/:id").get((req,res) => {
    
    usersPost.UserPostCollection.findById(req.params.id)
    .then((usersposts) => res.json(usersposts))
    .catch((err) => res.status(400).json("Error: " + err));
  })



  router.route('/likePost/:id/:userId').post((req,res) => {
    usersPost.UserPostCollection.findById(req.params.id)

    .then((userspost) => {
      //prevents something from being liked twice. 
if(userspost.userLikes.includes(req.params.userId)){
  return;
}

      userspost.postLikes+=1;
      userspost.userLikes.push(req.params.userId);
      userspost.save()
      .then(() => res.send("Saved!"))
      .catch(err => res.status(400).json('Error: saving post' + err));

    }).catch(err => res.status(400).json('Error: saving user' + err));

    User.UserCollection.findById(req.params.userId)
    .then((User) => {
      User.likedPosts.push(req.params.id);
      User.save()
    }) 
    })

    router.route('/unlikePost/:id/:userId').post((req,res) => {
      usersPost.UserPostCollection.findById(req.params.id)
  
      .then((userspost) => {
        //prevents something from being unliked twice. 
  if(!userspost.userLikes.includes(req.params.userId)){
    return;
  }
  
        userspost.postLikes-=1;
        //removes userId from the post array
        userspost.userLikes.pull(req.params.userId);
        userspost.save()
        .then(() => res.send("Saved!"))
        .catch(err => res.status(400).json('Error: saving post' + err));
  
      }).catch(err => res.status(400).json('Error: saving user' + err));
  
      User.UserCollection.findById(req.params.userId)
      .then((User) => {
        //removes postId from the user array
        User.likedPosts.pull(req.params.id);
        User.save()
      }) 
      })




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
  // });
  //
  // Old methods copy pasted from Students.
  //They will need to be updated to use Atlas clusters.
  // UPDATE student
  // router
  //   .route("/update-user.post/:id")
  //   // Get Single Student
  //   .get((req, res) => {
  //     usersPost.userPostSchema.findById(req.params.id, (error, data) => {
  //       if (error) {
  //         return next(error);
  //       } else {
  //         res.json(data);
  //       }
  //     });
  //   })

  // Update Student Data
  .put((req, res, next) => {
    usersPost.userPostSchema.findByIdAndUpdate(
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

// Delete user post
router.delete("/delete-user.post/:id", (req, res, next) => {
  usersPost.userPostSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
