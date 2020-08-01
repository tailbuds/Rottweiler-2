exports.userRegisteration = (req,res,next) => {
    const {name, username, password, confirm, phone} = req.body;

    let error = [];
    if(!name || !username || !password || !confirm || !phone)
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
        username,
        password,
        confirm,
        phone});
    }
    else
    {
        User.findOne({username: username})
        .then(users => {
            if(users){
                error.push({msg: "Email already exists"});
                res.render('signup',{
                    error,
                    name,
                    username,
                    password,
                    confirm,
                    phone});
            }
            else{
                const newuser = new User({
                    name,
                    username,
                    password,
                    phone
                });

                bcrypt.genSalt(10, (err,salt) => 
                bcrypt.hash(newuser.password,salt,(err, hash) =>{
                    if(err) throw err;

                    newuser.password = hash;

                    newuser.save().
                    then(users => {
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/');
                    })
                    .catch(err => console.log(err))
                }))
            }
        });
    }
}