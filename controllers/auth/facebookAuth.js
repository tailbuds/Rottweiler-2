/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const { User } = require('../../models/user');

// * Importing environment variables
require('dotenv').config();

let FACEBOOK_CLIENT_ID;
let FACEBOOK_CLIENT_SECRET;
if (process.env.NODE_ENV === 'development') {
  FACEBOOK_CLIENT_ID = process.env.DEV_FACEBOOK_CLIENT_ID;
  FACEBOOK_CLIENT_SECRET = process.env.DEV_FACEBOOK_CLIENT_SECRET;
}
if (process.env.NODE_ENV === 'test') {
  FACEBOOK_CLIENT_ID = process.env.TEST_FACEBOOK_CLIENT_ID;
  FACEBOOK_CLIENT_SECRET = process.env.TEST_FACEBOOK_CLIENT_SECRET;
}
if (process.env.NODE_ENV === 'production') {
  FACEBOOK_CLIENT_ID = process.env.PROD_FACEBOOK_CLIENT_ID;
  FACEBOOK_CLIENT_SECRET = process.env.PROD_FACEBOOK_CLIENT_SECRET;
}

module.exports = (passport) => {
  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  passport.deserializeUser((id, done) => {
    let user = User.findOne({ where: { facebookId: id } }).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new Strategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/facebook/redirect',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
};
