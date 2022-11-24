const router = require("express").Router();
const companyPost = require("../models/company.post.model")
const Company = require("../models/company.model")
const usersPost = require("../models/users.post.model");

router.route("/").get((req, res) => {
    companyPost.CompanyPostCollection.find()
        .then((companyposts) => res.json(companyposts))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addPost/:id").post((req, res) => {
    //Find the company
    Company.CompanyCollection.findById(req.params.id).then((company) => {
        //If this company is found. Create a post

        const thisPostCompanyName = company.companyName;
        const thisPostTitle = req.body.postTitle;
        const thisPostBody = req.body.postBody;
        const thisPostLikes = req.body.postLikes;
        const thisPostDislikes = req.body.postDislikes;
        const thisSector = req.body.sector;
        const accessLevel = req.body.accessLevel;
        const anonymous = req.body.anonymous;
        const userType = req.body.userType;

        //Create a new Post Object
        const newPost = new usersPost.UserPostCollection({
            postUserName: thisPostCompanyName,
            postTitle: thisPostTitle,
            postBody: thisPostBody,
            postSector: thisSector,
            postLikes: thisPostLikes,
            postDislikes: thisPostDislikes,
            accessLevel: accessLevel,
            anonymous: anonymous,
            userType: userType
        });

        //Saves to main post collection
        newPost
            .save()
            .then(function () {
                //Adds to thisCompanies Array of Posts
                company.posts.push(newPost);
                //Update companies new Array
                company
                    .save()
                    .then(() =>
                        res.json("Post added to " + company.companyName + " post array")
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
    companyPost.CompanyPostCollection.findById(req.params.id)
        .then((companyposts) => res.json(companyposts))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/getCompanyPosts/:id').get((req, res) => {
    Company.CompanyCollection.findById(req.params.id)
        .then(company => {
            //retrieve only the ids of the posts of the current company.
            let posts = company.posts.map((post) => (post.id));
            res.json(posts)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getCompanyLikedPosts/:companyId').get((req, res) => {
    Company.CompanyCollection.findById(req.params.companyId)
        .then(company => res.json(company.likedPosts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getCompanySavedPosts/:companyId').get((req, res) => {
    Company.CompanyCollection.findById(req.params.companyId)
        .then(company => res.json(company.savedPosts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/likePost/:id/:companyId").post((req, res) => {
    companyPost.CompanyPostCollection.findById(req.params.id)

        .then((companypost) => {
            //prevents something from being liked twice.
            if (companypost.companyLikes.includes(req.params.companyId)) {
                return;
            }

            companypost.postLikes += 1;
            companypost.companyLikes.push(req.params.companyId);
            companypost
                .save()
                .then(() => res.send("Saved!"))
                .catch((err) => res.status(400).json("Error: saving post" + err));

            Company.CompanyCollection.findById(req.params.companyId).then((Company) => {
                Company.likedPosts.push(req.params.id);
                Company.save();
            })
                .catch((err) => res.status(400).json("Error: saving company" + err));


        });
});

router.route("/unlikePost/:id/:companyId").post((req, res) => {
    companyPost.CompanyPostCollection.findById(req.params.id)

        .then((companypost) => {
            //prevents something from being unliked twice.
            if (!companypost.companyLikes.includes(req.params.companyId)) {
                return;
            }

            companypost.postLikes -= 1;
            //removes companyId from the post array
            companypost.companyLikes.pull(req.params.companyId);
            companypost
                .save()
                .then(() => res.send("Saved!"))
                .catch((err) => res.status(400).json("Error: saving post" + err));
        })
        .catch((err) => res.status(400).json("Error: saving company" + err));

    Company.CompanyCollection.findById(req.params.companyId).then((Company) => {
        //removes postId from the Company array
        Company.likedPosts.pull(req.params.id);
        Company.save();
    });
});

router
    .route("/savePost/:id/:companyId")
    .post((req, res) => {
        companyPost.CompanyPostCollection.findById(req.params.id);

        Company.CompanyCollection.findById(req.params.companyId).then((Company) => {
            if (Company.savedPosts.includes(req.params.id)) {
                //removes postId from the company's savedPosts array
                Company.savedPosts.pull(req.params.id);
                Company.save();
            } else {
                //adds postId from the company's savedPosts array
                Company.savedPosts.push(req.params.id);
                Company.save();
            }
        });
    })

router.route('/searchPost/:title').get((req, res) => {
    companyPost.CompanyPostCollection.findOne({ postTitle: req.params.title })
        .then((companyPost) => {
            res.send(companyPost);
        })
})

    // Update Student Data
    .put((req, res, next) => {
        companyPost.CompanyPostCollection.findByIdAndUpdate(
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
                    console.log("Company Post updated successfully!");
                }
            }
        );
    });

// Delete Company post


router.route("/delete-company.post/:id/:companyId").post((req, res, next) => {
    //delete the post document. 
    companyPost.CompanyPostCollection.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {


            Company.CompanyCollection.findById(req.params.companyId)
                .then(company => {
                    //Remove from the company's posts arroy
                    company.posts.pull({ '_id': req.params.id })
                    //console.log(company.posts);
                    company.save();
                })

            res.status(200).json({
                msg: data,
            });
        }

    });



});

module.exports = router;
