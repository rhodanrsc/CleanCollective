const router = require("express").Router();
const usersPost = require("../models/users.post.model");
const User = require("../models/user.model");
const Sector = require("../models/sector.model");

router.route("/").get((req, res) => {
  usersPost.UserPostCollection.find()
    .then((usersposts) => res.json(usersposts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addPost/:id").post((req, res) => {
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
});

router.route("/getPost/:id").get((req, res) => {
  usersPost.UserPostCollection.findById(req.params.id)
    .then((usersposts) => res.json(usersposts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/getUserPosts/:id').get((req, res) => {
  User.UserCollection.findById(req.params.id)
    .then(user =>{ 
       //retrieve only the ids of the posts of the current user.
      let posts = user.posts.map((post) => (post.id));
      res.json(posts)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getUserLikedPosts/:userId').get((req, res) => {

  User.UserCollection.findById(req.params.userId)
  .then(user => {
    //find user by id
      //map liked posts
      usersPost.UserPostCollection.find({'id': {$in: user.likedPosts}}, function (err,liked){
      if(err){
      console.log(err);
      }else{
        console.log(liked);
        res.json(liked);
      }
    })
  }).catch(err => res.status(400).json('Error: ' + err));
  })
  



router.route('/getUserSavedPosts/:userId').get((req, res) => {
  User.UserCollection.findById(req.params.userId)
  .then(user => res.json(user.savedPosts))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/likePost/:id/:userId").post((req, res) => {
  usersPost.UserPostCollection.findById(req.params.id)

    .then((userspost) => {
      //prevents something from being liked twice.
      if (userspost.userLikes.includes(req.params.userId)) {
        return;
      }

      userspost.postLikes += 1;
      userspost.userLikes.push(req.params.userId);
      userspost
        .save()
        .then(() => res.send("Saved!"))
        .catch((err) => res.status(400).json("Error: saving post" + err));

          User.UserCollection.findById(req.params.userId).then((User) => {
    User.likedPosts.push(req.params.id);
    User.save();
    })
    .catch((err) => res.status(400).json("Error: saving user" + err));


  });
});

router.route("/unlikePost/:id/:userId").post((req, res) => {
  usersPost.UserPostCollection.findById(req.params.id)

    .then((userspost) => {
      //prevents something from being unliked twice.
      if (!userspost.userLikes.includes(req.params.userId)) {
        return;
      }

      userspost.postLikes -= 1;
      //removes userId from the post array
      userspost.userLikes.pull(req.params.userId);
      userspost
        .save()
        .then(() => res.send("Saved!"))
        .catch((err) => res.status(400).json("Error: saving post" + err));
    })
    .catch((err) => res.status(400).json("Error: saving user" + err));

  User.UserCollection.findById(req.params.userId).then((User) => {
    //removes postId from the user array
    User.likedPosts.pull(req.params.id);
    User.save();
  });
});

router
  .route("/savePost/:id/:userId")
  .post((req, res) => {
    usersPost.UserPostCollection.findById(req.params.id);

    User.UserCollection.findById(req.params.userId).then((User) => {
      if (User.savedPosts.includes(req.params.id)) {
        //removes postId from the user's savedPosts array
        User.savedPosts.pull(req.params.id);
        User.save();
      } else {
        //adds postId from the user's savedPosts array
        User.savedPosts.push(req.params.id);
        User.save();
      }
    });
  })

  router.route('/searchPost/:title').get((req, res) => {
    usersPost.UserPostCollection.findOne({postTitle: req.params.title})
    .then((usersPost) => {
      res.send(usersPost);
    })
  })

  // Update Student Data
  .put((req, res, next) => {
    usersPost.UserPostCollection.findByIdAndUpdate(
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

router.route("/delete-user.post/:id/:userId").post((req, res, next) => {
  //delete the post document. 
  usersPost.UserPostCollection.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {

    User.UserCollection.findById(req.params.userId)
    .then(user => { 
      //Remove from the user's posts arroy
      user.posts.pull({'_id' : req.params.id})
      //console.log(user.posts);
      user.save();
    })

    res.status(200).json({
      msg: data,
    });
  }

  });



});

module.exports = router;
