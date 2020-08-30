const mongoose = require('mongoose');


//user schema
let UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
});


let User = module.exports = mongoose.model('User', UserSchema);