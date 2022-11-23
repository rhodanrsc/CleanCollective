const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {

  passport.use(
    new localStrategy((email, password, done) => {
      //Checks email to find that a user actually exists first.
      User.UserCollection.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        //Then bcrypt decrypts and compares the input password to the database password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            //Login success
            return done(null, user);
          } else {
            //Login fail
            return done(null, false);
          }
        });
      });
    })
  );

  //Triggered when logging in.
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  //Triggered when pulling information from req.user
  passport.deserializeUser((id, cb) => {
    User.UserCollection.findOne({ _id: id }, (err, user) => {
        cb(err,user);
    });
  });
};
