const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const { ObjectID } = require('mongoose/lib/schema/index')

// request schema
const ReliefSchema = mongoose.Schema({
    name: { type: String, required: true },
    operations: [
        { 
            incharge: { type: String, required: true },
            dateDistribute: {type: Number},
            details: { type: String, required: false },
            dateAdded: { type: Number },
            status: { type: Number, default: 1},
            operationName: { type: String, default: 1},
        }
    ],
    lat: { type: String, required: true },
    lng: { type: String, required:  true },
    address: { type: String, required:  false },
    dateAdded: { type: Number },
    dateUpdated: { type: Number },
    archive: { type: Number, default: 0 },
    updateBy: { type: ObjectID },
});

const Relief = module.exports = mongoose.model('Relief', ReliefSchema);



module.exports.addRelief = function (newUser, cb) {
    Relief.create(newUser,(err, response) => {  
        if (response) {
            return cb({ success: true, message: "Relief added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}
module.exports.getRelief = function (req, cb) {
    Relief.aggregate([
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
    })
} 
module.exports.getArchiveRelief = function (req, cb) {
    Relief.aggregate([
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
    })
} 
module.exports.updateRelief = function (relief, cb) {
    Relief.updateOne(
        {
            _id: ObjectId(relief._id)
        },
        {
            $set: {
                name: relief.name,
                lat: relief.lat,
                lng: relief.lng,
                address: relief.address,
                operations: relief.operations,
                updatedBy: relief.updatedBy,
                dateUpdated: new Date().getTime()
            }
        },
        (err, response) => {  
        if (response) {
            return cb({ success: true, message: "Relief update successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message});
        }
    });
}
module.exports.updatearchive = function (data, cb) {
    Relief.updateOne(
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