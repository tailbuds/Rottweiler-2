/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user');

// * Importing environment letiable
require('dotenv').config();

let GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET;
if (process.env.NODE_ENV === 'development') {
  GOOGLE_CLIENT_ID = process.env.DEV_GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = process.env.DEV_GOOGLE_CLIENT_SECRET;
}
if (process.env.NODE_ENV === 'test') {
  GOOGLE_CLIENT_ID = process.env.TEST_GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = process.env.TEST_GOOGLE_CLIENT_SECRET;
}
if (process.env.NODE_ENV === 'production') {
  GOOGLE_CLIENT_ID = process.env.PROD_GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = process.env.PROD_GOOGLE_CLIENT_SECRET;
}

module.exports = (passport) => {
  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  passport.deserializeUser((id, done) => {
    let user = User.findOne({ where: { googleid: id } });
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        let name = profile._json.name;
        let id = profile.id;
        User.findOne({ where: { googleid: id } })
          .then((user) => {
            if (user) {
              console.log('User Already Exist');
              done(null, response[0]);
            } else {
              User.create({
                name: name,
                googleid: id,
              })
                .then((res) => {
                  console.log('User Added');
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
};
