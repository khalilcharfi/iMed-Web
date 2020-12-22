const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate')
const { ObjectID } = require('mongoose/lib/schema/index')

// request schema
const QuakeSchema = mongoose.Schema({
    details: { type: String },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    addedBy: { type: ObjectID, },
    updateBy: { type: ObjectID },
    intensity: { type: String, required: true },
    magnitude: { type: String, required: true },
    dateAdded: { type: Number },
    dateUpdated: { type: Number },
    archive: { type: Number, default: 0 },
});

const Quake = module.exports = mongoose.model('Quake', QuakeSchema);



module.exports.addQuake = function (newData, cb) {
    newData.dateAdded = new Date().getTime();
    Quake.create(newData, (err, response) => {
        if (response) {
            return cb({ success: true, message: "Quake added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message });
        }
    });
}
module.exports.getQuake = function (req, cb) {
    Quake.aggregate([
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
module.exports.getArchiveQuake = function (req, cb) {
    Quake.aggregate([
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
module.exports.updateQuake = function (data, cb) {
    Quake.updateOne(
        {
            _id: ObjectId(data._id)
        },
        {
            $set: {
                lat: data.lat,
                lng: data.lng,
                updateBy: data.updateBy,
                intensity: data.intensity,
                magnitude: data.magnitude,
                details: data.details,
                dateUpdated: new Date().getTime()
            }
        }, { upsert: true },
        (err, response) => {
            if (response) {
                return cb({ success: true, message: "Earthquake update successfully.", data: response });
            } else {
                return cb({ success: false, message: err.message });
            }
        });
}
module.exports.updatearchive = function (data, cb) {
    Quake.updateOne(
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