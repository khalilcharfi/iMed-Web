const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate');
const server = require('../index')

// request schema
const RescuerFeedsSchema = mongoose.Schema({
    name: { type: String, required: true },
    plateNo: { type: String, required: true },
    address: { type: String, required: true },
    driversLicense: { type: String, required: true },
    dateAdded: { type: Date, required: true },
    status: { type: Number, default: 1 },
});

const Rescuer = module.exports = mongoose.model('Rescuer', RescuerFeedsSchema);



module.exports.addPost = function (newPost, cb) {
    newPost.dateAdded = lib.newDateTime();
    Rescuer.create(newPost, (err, response) => {
        if (response) {
            return cb({ success: true, message: "Post added successfully.", data: response });
        } else {
            return cb({ success: false, message: err.message });
        }
    });
}
module.exports.getPost = function (req, cb) {
    newsFeeds.aggregate([
        { $match:{postStatus:1}},
        {
            $lookup: {
                from: 'users',
                localField: 'addedBy',
                foreignField: '_id',
                as: 'userAdded'
            }
        },
        {
            $unwind: {
                path: '$userAdded',
                preserveNullAndEmptyArrays: true
              }
        },
        { $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true
          }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'comments.byId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
              }
        },
        {
            $addFields: {
                'comments.byName': '$user.username',
            }
        },
        {
            $group: {
                _id: "$_id",
                caption: {$first: "$caption"},
                userAddedName: {$first: "$userAdded.username"},
                addedBy: {$first: "$addedBy"},
                userAddedImage: {$first: "$userAdded.image"},
                comments: {$addToSet: "$comments"},
                images: {$first: "$images"},
                dateAdded: {$first: "$dateAdded"}
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
module.exports.pushComment = function (newComment, cb) {
    newComment.dateAdded = new Date().getTime(),
    newsFeeds.updateOne(
        {
            _id: ObjectId(newComment.postId)
        },
        {
            $push: {
                "comments": {
                    byId: newComment.byId,
                    message: newComment.message,
                    dateAdded:  newComment.dateAdded,
                }
            }
        },
      
        (err, response) => {
            if (response) {
                return cb({ success: true, message: "Comment added successfully.", data: newComment });
            } else {
                return cb({ success: false, message: err.message });
            }
        });
}