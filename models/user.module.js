const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateUser(User) {
    const schema ={
        name: Joi.string().min(5).max(50).required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string().min(5).max(50).required(),
    } 
    return Joi.validate(User, schema);
    
}

function validate(User) {
    const schema ={
        phoneNumber: Joi.string().required(),
        password: Joi.string().min(5).max(50).required(),
    } 
    return Joi.validate(User, schema);
    
}

exports.User = User;
exports.validateUser = validateUser;
exports.validate = validate;