const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowerCase: true,
        required : [true, 'Please provide email'],
        trim : true,
        validate: validator.isEmail
    },
    password : {
        type: String,
        required : [true, 'Please provide password'],
        trim : true,
        minLength: 9
    },
    name : {
        type: String,
        required : [true, 'Please provide name'],
    },
    dob: {
        type: String,
        required : [true, 'Please provide dob'],
    }
}, {timestamps: true});

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);

    next();
})

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;