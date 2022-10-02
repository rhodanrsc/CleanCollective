const router = require('express').Router();
const User = require('../models/user.model');
const Company = require('../models/company.model');

const UserPost = require('../models/users.post.model');
const { Router } = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//-----------------------------END OF IMPORTS-----------------------------

//Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    secret: "secretcode", //links cookies to the session
    resave: true,
    saveUninitialized: true,
  })
);
router.use(cookieParser("secretcode")); // links cookies to the session
router.use(passport.initialize());
router.use(passport.session());
require("../passportConfig")(passport);
//-----------------------------END OF MIDDLEWARE-----------------------------

//Returns list of Users
router.route('/').get((req, res) =>{
    User.UserCollection.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: Couldnt return list of Users - ' + err));

});

//Creates a new User
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //HASHING and SALTING
    const password = hashedPassword;
    const email = req.body.email;
    //Creates an empty array
    const associatedCompanies = [];
    const posts = [];
    //Still need comfirm accounts and post

    const newUser = new User.UserCollection({
        username : username,
        password : password,
        email : email,
        associatedCompanies  : associatedCompanies,
        posts  : posts
    });

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: failed to save company - ' + err));

});

//Adds a company to a User Array via id
router.route('/addCompany/:id').post((req,res) => {
    //Find the user
    User.UserCollection.findById(req.params.id)
    .then(user => {
        //If this user is found. Find the company
        Company.CompanyCollection.findOne({companyName: req.body.companyName})
        
        .then(function (foundCompany) {
            //If company is found. add it
            if(foundCompany != null){
             //Add the company to the User Company Array
            user.associatedCompanies.push(foundCompany);
            //Save company
            user.save()
            .then(() => res.json('Company added to user: '+ user.username))
            .catch(err =>res.status(400).json('Error: with adding company to user ' +err));
            //If not, just print out for
            } else{
                console.log("Company does not exist");
                res.json("Company does not exist");
            }
        })
        .catch((err) => res.status(400).json("Error: user not found " + err));
    })
})


//Delete a user via id
router.route('/delete/:id').delete((req, res) => {
  User.UserCollection.findByIdAndDelete(req.params.id)
    .then(user => res.json('User ' + user.username + ' deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
Description: Updates the User fields
Pre-Condition: 
1. All required fields are needed to execute (username, password and email). 
2. The user id msut be in url
*/
router.route('/update/:id').post((req, res) => {
  User.UserCollection.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.associatedCompanies = req.body.associatedCompanies;
      user.posts = req.body.posts;


      user.save()
        .then(() => res.json('User '+ user.username + ' updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


//Find user by ID
router.route('/:id').get((req, res) => {
  User.UserCollection.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Find user by username
router.route('/findUserName').post((req, res) => {
  User.UserCollection.findOne({username : req.body.username})
    .then(function(user){
        //If User exits return true
        //Else return false
        if(user != null){
            res.send(true)
        } else {
            res.send(false);
        }
        
    }) 
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/login").post((req, res, next) => {
    console.log('login1');
    passport.authenticate("local", (err, user, info) => {
      console.log('login2');
      if (err) throw err;
      if (!user) {
        console.log('login3');
        res.status(400).json({ error: 'User does not exist' });
        // res.send("User does not exist");
      } else {
        console.log('login4');
        req.login(user, (err) => {
          console.log('login5');
          if (err) throw err;
          // res.send("Successfully Authenticated");
          res.send(req.user);
          console.log(req.user);
        });
      }
    })(req, res, next);
});


module.exports = router;
