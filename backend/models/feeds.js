const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate');
const server = require('../index')

// request schema
const NewsFeedsSchema = mongoose.Schema({
    addedBy: { type: ObjectId, required: true },
    caption: { type: String, required: true },
    images: [{
        fileName: { type: String, required: true },
        alt: { type: String, required: true },
    }],
    comments: [
        {
            byId: { type: ObjectId, required: true },
            message: { type: String },
            dateAdded: { type: Date },
            commentStatus: { type: Number, default: 1 },
        }
    ],
    dateAdded: { type: Date, required: true },
    postStatus: { type: Number, default: 1 },
});

const newsFeeds = module.exports = mongoose.model('News-Feeds', NewsFeedsSchema);



module.exports.addPost = function (newPost, cb) {
    newPost.dateAdded = lib.newDateTime();
    newsFeeds.create(newPost, (err, response) => {
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