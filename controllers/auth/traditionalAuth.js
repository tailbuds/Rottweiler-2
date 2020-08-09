//const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

exports.signUp = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
  })
    .then((user) => {
      if (user) {
        console.log('User Added');
        res.send({ message: 'User was registered successfully!' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.signIn = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      let isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }
      let jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      if (isPasswordValid) {
        res.status(200).send({
          id: user.id,

          email: user.email,

          accessToken: jwtToken,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
