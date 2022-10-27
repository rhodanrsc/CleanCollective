const router = require('express').Router();
const cors = require("cors");
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
router.route('/delete/:id').post((req, res) => {
  const currentPassword = req.body.currentPassword;
  const confirmPassword = req.body.confirmPassword;
  User.UserCollection.findById(req.params.id)
  .then(user => {
    let validCredentials = bcrypt.compareSync(currentPassword, user.password);
    if(validCredentials && currentPassword === confirmPassword){
        User.UserCollection.findByIdAndDelete(req.params.id)
        .then(
          res.send("success")
        )
        .catch(err => res.status(400).json('Error: ' + err));
    } else{
      res.send("passwordError")
    }
      
  })
  
})

/*
Description: Updates the User fields
Pre-Condition: 
1. The user id must be in url
Post-Conditions: 
1. Saves the update if it was successful and returns "success" as a string
2. Returns a string depending on error. Ex "passwordError" or "existError"
*/
router.route('/updateOneField/:id').post((req, res) => {
  //Find the session user first.
  User.UserCollection.findById(req.params.id)
    .then(user => {
      //Find this persons new Username
      const updateType = req.body.updateType;
      const newUsername = req.body.username;
      const newEmail = req.body.email;
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const confirmPassword = req.body.confirmPassword;
      
      User.UserCollection.find()
      .then(function(users){
        let existField = false;
        let message = 'success';
        /******** Change Username *******/
        if(updateType === "username"){
          //Find a username that exists
          users.forEach(function(user){
            if(newUsername === user.username){
              existField = true;
            }
          });
          //Save or send false if field exist
          if(!newUsername){
            message = "emptyError";
          } else if(existField === true){
            message = "existError";
          } else{
            user.username = newUsername;
          }
        /******** Change Email *******/
        } else if (updateType === "email"){
          //Check if password is correct
          if(bcrypt.compareSync(currentPassword, user.password)){
            users.forEach(function(user){
            if(newEmail === user.email){
              existField = true;
            }
            });
            if(existField === true){
              message = 'existError'
            } else{
              user.email = newEmail;
            }
          } else{
            message = 'passwordError'
          }
          /******** Change Password *******/
        } else if (updateType === "password"){
          const passwordRegex = /(?=.*[0-9])/;
            if(bcrypt.compareSync(currentPassword, user.password)){
              if(newPassword.length < 8){
                message = 'shortPasswordError'
              } else if (!passwordRegex.test(newPassword)){
                message = 'regexError'
              } else if (newPassword === confirmPassword){
                const hashedPassword = bcrypt.hashSync(newPassword, 10);
                user.password = hashedPassword;
              } else {
                message = 'matchPasswordError'
              }
            } else{
              message = 'passwordError'
            }
        }

        user.save()
        .then(() => res.send(message))
        .catch(err => res.status(400).json('Error: saving user' + err));
      })
      .catch(err => res.status(400).json('Error: Couldnt return list of Users - ' + err));
    })
    .catch(err => res.status(400).json('Error: finding id' + err));
});

router.route('/logout').post((req, res, next)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
});

router.route('/getUser').get((req, res) => {
  (res.send(req.user));
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
        res.status(401).json({ error: 'User does not exist' });
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
