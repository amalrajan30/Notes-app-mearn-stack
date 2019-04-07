const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type:String
    },
    email : {
        type:String,
        unique:true
    },
    password : {
        type:String
    },
    reg_date : {
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model('User', userSchema)