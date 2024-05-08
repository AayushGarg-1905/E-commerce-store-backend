const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide username'],
        minLength:3
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        validate:{
            validator:validator.isEmail,
            message:'Invalid email format'
        }
    },
    password:{
        type:String,
        required:[true,'Please provide password']
    },
    accessToken:{
        type:String,
    }
})

module.exports = mongoose.model('User',UserSchema);