//collecting dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');



//connect to database
mongoose.connect(config.database,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function(){
    console.log('connected to nodekb database...');
}).catch(function(err){
    console.log(err);
});


//initiallinzing express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//bring in article models from model
let Article = require('./models/article');
//bring in comment models from model
let Comment = require('./models/comment');


//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load static files
app.use(express.static(path.join(__dirname, 'public')));


//express session midleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//express messages midleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req,res);
    next();
});

// express validator midleware
// app.use(validator({
//     errorFormatter: function(param, msg, value){
//         var namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;

//         while(namespace.length){
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return{
//             param : formParam,
//             msg : msg,
//             value : value
//         };
//     }
// }));


//passport config
require('./config/passport')(passport);
// pasport midleware
app.use(passport.initialize());
app.use(passport.session());


//global variable
app.use( function(req, res, next){
    res.locals.user = req.user || null;
    next();
}); 



//home route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        Comment.find({}, function(err, comments){
            if(err){
                console.log(err);
            }else{
                res.render('index',{
                    articles:articles,
                    comments:comments
                });
            }
        })
    })
});

//comment process
app.post('/', function(req, res){
    const comment = req.body.comment;

    if (comment == ''){
        res.send('sorry')
        return
    }else{
        let newComment = new Comment({
            comment:comment
        })
        newComment.save(function(err){
            if(err){
                console.log(err);
                return;
            }else{
                req.flash('success','Article Added');
                res.redirect('/');
            }
        })
    }
});

//route files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);



//server listening
const port = 9000;
app.listen(port, function(){
    console.log(`server listening on port: ${port}`);
});