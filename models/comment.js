const mongoose = require('mongoose');

//comment schema
let commentSchema = mongoose.Schema({
    comment:{
        type:String,
        require:true
    }
});


let Comment = module.exports =mongoose.model('Comment', commentSchema);