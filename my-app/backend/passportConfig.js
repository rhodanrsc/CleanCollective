const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {

  passport.use(
    new localStrategy((email, password, done) => {
      console.log('config1');
      //Checks email to find that a user actually exists first.
      User.UserCollection.findOne({ email: email }, (err, user) => {
        console.log('config2');
        if (err) throw err;
        if (!user) return done(null, false);
        console.log('config3');
        //Then bcrypt decrypts and compares the input password to the database password
        bcrypt.compare(password, user.password, (err, result) => {
          console.log('config4');
          if (err) throw err;
          if (result === true) {
            console.log('config5');
            //Login success
            return done(null, user);
          } else {
            console.log('config6');
            //Login fail
            return done(null, false);
          }
        });
      });
    })
  );

  //Triggered when logging in.
  passport.serializeUser((user, cb) => {
    console.log('config7');
    cb(null, user.id);
  });

  //Triggered when pulling information from req.user
  passport.deserializeUser((id, cb) => {
    console.log('config8');
    User.UserCollection.findOne({ _id: id }, (err, user) => {
        cb(err,user);
    });
  });
};
