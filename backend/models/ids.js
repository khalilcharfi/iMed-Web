const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const counterSchema = mongoose.Schema({
    for: { type: String },
    seq: { type: Number },
});

const counters = mongoose.model('counters', counterSchema);

module.exports.GetID = (name, callback) => {
    var ret = counters.findOneAndUpdate(
        { for: name },
        { $inc: { "seq": 1 } },
        { upsert: true, returnNewDocument: true }
        , (a, b) => { return callback({ error: a, data: b }) });
}

module.exports.CheckID = (name, callback) => {
    counters.findOne({ for: name }, callback )
        
    //  counters.findOne({ for: name }, (err, response) => {
    //      if(err ) return callback({ success: false, message: err.message });
    //      if( response ) {
    //          return callback({ success: true, message: response})
    //      } else {
    //          return callback({success: false , message: "Something Wrong."})
    //      }
    //  })
}
