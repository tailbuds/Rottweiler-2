/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if(user)
      {
          user.update({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 12),
        });
        return
      }
      next();
    })
      // if (user) {
      //   res.status(400).send({
      //     message: 'Failed! Email already Exist',
      //   });
      //   return;
      // }
      // next();
    .catch((err) => {
      console.log(err);
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
