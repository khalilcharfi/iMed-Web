const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate');


// request schema
const RoleSchema = mongoose.Schema({
    role: { type: String, required: true },
    // status: { type: Number, default: true },
    dateAdded: { type: Date }
});

const Role = module.exports = mongoose.model('Role', RoleSchema);



module.exports.addRole = function (newRole, cb) {
    newRole.dateAdded = lib.newDateTime();
    Role.create(newRole,(err, response) => {  
        if (response) {
            return cb({ success: true, message: "Role added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}

module.exports.getRoles = function (req, cb) {
    Role.find((err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 