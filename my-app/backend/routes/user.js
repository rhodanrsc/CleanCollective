const router = require('express').Router();
const User = require('../models/user.model');
const Company = require('../models/company.model');

const UserPost = require('../models/users.post.model');
const { Router } = require('express');

//Returns list of Users
router.route('/').get((req, res) =>{
    User.UserCollection.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: Couldnt return list of Users - ' + err));

});

//Creates a new User
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
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

router.route("/login").post((req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    //confirm if matches user in database
    User.UserCollection.findOne({email: req.body.email},{password: req.body.password})

    .then(function (userFound){
        //if the specific user is found then login
        if(userFound != null){
            console.log("User exists!");
            //navigate to diffrent page with user logged in
            
        }else{
            //throw error
            alert("Incorrect Username or password, please try again");
            console.log("User does not exist");
            res.json("User does not exist");
         }
    })
    .catch((err) => res.status(400).json("Error: user not found " + err));

})


module.exports = router;
