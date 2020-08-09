const User = require('../../models/user');

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email already Exist',
        });
        return;
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
