const bcrypt = require('bcryptjs');

const { User } = require('../models/user');

exports.userRegistration = (req,res,next) => {
    const {name, email, password, confirm, phone} = req.body;

    let error = [];
    if(!name || !email || !password || !confirm || !phone)
    {
        error.push({msg : "Please fill all the fieds"});
    }
    if(password != confirm)
    {
        error.push({msg: "Passwords do not match"});
    }
    if(password.length < 6)
    {
        error.push({msg: "Password should be atleast 6 characters"});
    }
    if(error.length > 0)
    {
        res.render('signup',{
        error,
        name,
        email,
        password,
        confirm,
        phone});
    }
    else
    {
        User.findOne({ where: { email: email } })
          .then((user) => {
            if (user) {
              console.log('User Already Exist');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
              User.create({
                name: name,
                email: email,
                password: hashPassword,
                emailVerified: true
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
}