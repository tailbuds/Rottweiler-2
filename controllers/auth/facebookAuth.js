const passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const User = require('../../models/user');

// * Importing environment letiable
require('dotenv').config();

module.exports = (passport) => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: '/return',
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
      }
    )
  );
};
