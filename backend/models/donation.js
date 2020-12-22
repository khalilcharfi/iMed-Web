const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate');
const server = require('../index')

// request schema
const DonationSchema = mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: false },
    dateAdded: { type: Date, required: true},
});

const Donation = module.exports = mongoose.model('Donation', DonationSchema);



module.exports.addDonation = function (newUser, cb) {
    newUser.dateAdded = lib.newDateTime();
    Donation.create(newUser,(err, response) => {  
        if (response) {
            return cb({ success: true, message: "Donation contact added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}
module.exports.getDonation = function (req,cb) {
    Donation.find( (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 
module.exports.updateDonation = function (donation, cb) {
    Donation.updateOne(
        {
            _id: donation.id
        },
        {
            $set: {
                name: donation.name,
                details: donation.details,
                image: donation.image
            }
        },
        (err, response) => {  
        if (response) {
            return cb({ success: true, message: "Donation update successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}