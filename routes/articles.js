const express = require('express');
const router = express.Router();
const flash = require('connect-flash')

//bring in article model
let Article = require('../models/article');
// bring in user model
let User = require('../models/user');
// bring in user comment
// let Comment = require('../models/comment');


//add route
router.get('/add', function(req, res){
    res.render('add_article');
});


//add submit post route
router.post('/add', ensureAuthenticated, function(req, res){
    
        let article = new Article();
        article.title = req.body.title;
        article.author = req.user._id;
        article.body = req.body.body;

        article.save(function(err){
            if(err){
                console.log(err);
                return;
            }else{
                req.flash('success','Article Added');
                res.redirect('/');
            }
        })
    
});

//load edit form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Article.findById(req.params.id, function(err, article){
        if(article.author != req.user._id){
            req.flash('error','Not Authorized')
            res.redirect('/');
        }else{
            res.render('edit_article',{
                article:article
            });
        }
    })
});


//update submit post route
router.post('/edit/:id', function(req, res){
    let article = {};
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.updateOne(query, article, function(err){
        if(err){
            console.log(err);
            return;
        }else{
            req.flash('success','Article Updated');
            res.redirect('/');
        }
    })
});

//delete article
router.delete('/:id', function(req, res){
    // if(!req.user._id){
    //     res.status(500).send();
    // }


    let query = {_id:req.params.id}

    Article.findById(req.params.id, function(err, article){
        if(article.author != req.user._id){
            res.status(500).send();
        }else{
            Article.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            })
        }
    })
});


//get single article
router.get('/:id', ensureAuthenticated, function(req, res){
    Article.findById(req.params.id, function(err, article){
        User.findById(article.author, function(err, user){
            res.render('article',{
                article:article,
                author: user
            })
        });
    })
});



//access control
function ensureAuthenticated (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger','please log in');
        // req.alert('please log in');
        res.redirect('/users/login')
    }
}


module.exports = router;