const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

module.exports = function(passport) {
    passport.use(new LocalStrategy ({usernameField : 'username'},(username, password,done) => {
        User.findOne({username: username})
        .then(user => {
            if(!user)
            {
                return done(null, false, {message : 'That email is not registered !'});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch){
                    return done(null, user);
                }
                else {
                    return done(null, false, {message: "Password is incorrect"});
                }
            });
        })
        .catch(err => console.log(err));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}