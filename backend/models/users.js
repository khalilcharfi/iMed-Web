const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate');


// request schema
const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    loggedInStatus: { type: String, required: true, default: 0 },
    role:{ type: String, required: true},
    image:{ type: String },
    // status: { type: Number, default: true },
    menus:[
        // {
        //     menutitle : { type: String },
        // }
    ],
    dateAdded: { type: Date, default: lib.newDateTime() }
});

const User = module.exports = mongoose.model('User', UserSchema);

//comparePassword from users.js
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addNewUser = function (newUser, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            let User = mongoose.model("User", UserSchema);
            data = new User(newUser);
            data.password = hash;
            data.save((err, response) => {  
                if (response) {
                    return cb({ success: true, message: "User registered successfully", data: response });
                } else {
                    return cb({ success: false, message: err.message});
                }
            });
        });
    });
}
// users query
module.exports.getUserData = function (username, callback) {
    User.find({username: username},callback);
}

module.exports.getUsers = function (req,cb) {
    User.find( (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 

module.exports.updateUser = function (newInfo, cb) {
    User.updateOne(
        {
            _id: newInfo.userId
        },
        newInfo,
        (err, response) => {  
        if (response) {
            return cb({ success: true, message: "User update successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}