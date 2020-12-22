const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const GetID = require('../models/counters').GetID;
const ObjectId = mongoose.Types.ObjectId;
const lib = require('../library/newDate')

const base = require('path').basename(__filename).split('.')[0];
// request schema
const ImageSchema = mongoose.Schema({
    source: { type: String, maxlength: 50, required: true },
    for: { type: String, maxlength: 50, required: true },
    dateAdded: { type: Date, default: lib.newDateTime() },
});

const Image = module.exports = mongoose.model('Image', ImageSchema);



module.exports.addImage = function (data, cb) {
    let useFor = data.body.useFor;
    let username = 'admin;'
    let formidable = require('formidable');
    let fs = require('fs');
    let path = require('path');
    let md5 = require('md5');

    var form = new formidable.IncomingForm();
    form.uploadDir = `${__dirname}/../uploads/${data.body.uploadPath}/`;
    form.on('file', async (field, file) => {
        let newFileName = [
            username,
            Math.random(),
            Math.random(),
            Math.random(),
        ];
        newFileName = `${md5(newFileName.join(''))}.${file.name.split('.').pop()}`;
        if (fs.existsSync(file.path)) {
            fs.rename(file.path, path.join(form.uploadDir, newFileName), (err) => {
                if (err) {
                    return cb({ success: false, message: err.name + " " + err.message })
                } else {

                    let cdata = {
                        source: newFileName,
                        for: useFor,
                        date_added: new Date
                    };
                    Image.create(cdata,(err, response) => {  
                        if (response) {
                            return cb({ success: true, filename: newFileName });
                        } else {
                            return cb({ success: false, message: err.message});
                        }
                    });
                }
            });
        } else {
            return cb({ success: false, message: "Something went wrong please re-upload your image." })
        }
    });

    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function () {
    });
    form.parse(data);
}


module.exports.removeImageProfile = function (req, cb) {
    Image.deleteOne({ source: req.body.filename }, (err) => {
        if (err) {
          return res.status(500).send({ success: false, message: err.message });
        } else {
          let fs = require('fs');
          fs.unlink(`./uploads/${req.body.uploadPath}/`+ req.body.filename, (err) => {
            if (err) {
              return cb({ success: false, message: 'The server cant find the file.' })
            } else {
              return cb({ success: true, message: 'The file has been remove.' })
            }
          });
        }
      });
}

