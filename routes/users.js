const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');

//bring in user model
let User = require('../models/user');


//register form
router.get('/register', function(req, res){
    res.render('register');
});

//register process
router.post('/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    User.findOne({ email:email }).then(user => {
        if(user){
            req.flash('error','Email name exist, please use another name');
            res.redirect('/users/register');
        
        }
        User.findOne({ username:username }).then(store => {
            if(store){
                req.flash('error','Username already in use');
                res.redirect('/users/register');
            }

            if(password != password2){
                req.flash('error','passwords do not match');
                res.redirect('/users/register');
                if(password < 8){
                    req.flash('error','passwords most be atleast 8 characters');
                    res.redirect('/users/register')}
            }else{
                let newUser = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                })
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err){
                            console.log(err);
                        }
                        newUser.password = hash;
                        newUser.save();
                        req.flash('success','you are now registered')
                        res.redirect('/users/login'); 
                    });
                })
            }
        }).catch(err => console.log(err))
    }).catch(err => c0nsole.log(err))
});


//login form
router.get('/login', function(req, res){
    res.render('login');
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res,next);
});


//logout
router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success','you are logged out');
    res.redirect('/');
});


module.exports = router;