const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate')

// request schema
const ContactSchema = mongoose.Schema({
    officeName: { type: String, required: true },
    phoneNumber: [],
    address: { type: String, required: true },
    dateAdded: { type: Date, default: lib.newDateTime() },

});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);



module.exports.addContact = function (newContact, cb) {
    Contact.create(newContact,(err, response) => {  
        if (response) {
            return cb({ success: true, message: "Emergency contact added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}
module.exports.getContact = function (req,cb) {
    Contact.find( (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
}
module.exports.updateContact = function (contact, cb) {
    Contact.updateOne(
        {
            _id: contact.id
        },
        {
            $set: {
                officeName: contact.officeName,
                address: contact.address,
                phoneNumber: contact.phoneNumber
            }
        },
        (err, response) => {  
        if (response) {
            return cb({ success: true, message: "Emergency contact update successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}