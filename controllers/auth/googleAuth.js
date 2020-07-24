/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */
const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models/user');

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
    let user = User.findOne({ where: { googleId: id } }).then((user) => {
      done(null, user);
    });
  });

  const apiKey = process.env.DEV_API_KEY;

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //  console.log(profile);
        const name = profile.displayName;
        const id = profile.id;
        const profilePicture = profile._json.picture;
        const email = profile._json.email;
        const emailVerified = profile._json.email_verified;

        axios
          .get(
            `https://people.googleapis.com/v1/people/${id}?personFields=birthdays,genders&key=${apiKey}&access_token=${accessToken}`
          )
          .then((res) => {
            const gender = res.data.genders[0].value;
            const date = res.data.birthdays[0].date;
            const birthday = `${date.year}-${date.month}-${date.day}`;
            console.log(birthday);
            return { birthday: birthday, gender: gender };
          })
          .then((userData) => {
            User.findOne({ where: { googleId: id } })
              .then((user) => {
                if (user) {
                  console.log('User Already Exist');
                  done(null, user);
                } else {
                  User.create({
                    name: name,
                    googleId: id,
                    profileImage: profilePicture,
                    emailVerified: true,
                    email: email,
                    birthday: userData.birthday,
                    gender: userData.gender,
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
};
