const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const { ObjectID } = require('mongoose/lib/schema/index')

// request schema
const ShelterSchema = mongoose.Schema({
    details: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    addedBy: { type: ObjectID, },
    updateBy: { type: ObjectID },
    dateAdded: { type: Number },
    dateUpdated: { type: Number },
    address: { type: String, required:  true },
    archive: { type: Number, default: 0 },
});

const Shelter = module.exports = mongoose.model('Shelter', ShelterSchema);



module.exports.addShelter = function (newShelter, cb) {
    newShelter.dateAdded = new Date().getTime();
    Shelter.create(newShelter,(err, response) => {  
        if (response) {
            return cb({ success: true, message: "Shelter added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}
module.exports.getShelter = function (req, cb) {
    Shelter.aggregate([
        {
            $match: {
                archive: 0
            }
        },
        {
            $sort: { dateAdded: -1}
        }

    ], (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 
module.exports.getShelterDetails = function (req, cb) {
    Shelter.aggregate([
        {
            $match: {
                archive: 0,_id:ObjectId(req._id)
            }
        },
        {
            $sort: { dateAdded: -1}
        }

    ], (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 
module.exports.getArchiveShelter = function (req, cb) {
    Shelter.aggregate([
        {
            $match: {
                archive: 1
            }
        },
        {
            $sort: { dateAdded: -1}
        }

    ], (err, res) => {
        if (err) { return cb({ sucess: false, message: err.message }); } else {
            return cb({ success: true, data: res });
        }
    });
} 

module.exports.updateShelter = function (data, cb) {
    Shelter.updateOne(
        {
            _id: ObjectId(data._id)
        },
        {
            $set: {
                lat: data.lat,
                lng: data.lng,
                updateBy: data.updatedBy,
                address: data.address,
                details: data.details,
                dateUpdated: new Date().getTime()
            }
        }, { upsert: true },
        (err, response) => {
            if (response) {
                return cb({ success: true, message: "Shelter update successfully.", data: response });
            } else {
                return cb({ success: false, message: err.message });
            }
        });
}
module.exports.updatearchive = function (data, cb) {
    Shelter.updateOne(
        {
            _id: ObjectId(data.id)
        },
        {
            $set: {
                archive: 1
            }
        }, { upsert: true },
        (err, response) => {
            if (response) {
                return cb({ success: true, message: "Archive update successfully.", data: response });
            } else {
                return cb({ success: false, message: err.message });
            }
        });
}