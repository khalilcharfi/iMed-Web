const User = require('../models/users');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addUser', (req, res) => {
    var a = req.body;
    var newUser = {
        username: a.username,
        password: a.password,
        image: a.image,
        role: a.role,
        menus: a.menus
    };
    User.addNewUser(newUser,data => {
        res.json(data)
    });
});

//Authenticate
router.post('/authenticateSignIn', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        // console.log(user.status);
        if (!user) {
            //user not found
            return res.json({ success: false, msg: 'Username and password did not match! Please try again' });
        } else if (user.status == false) {
            return res.json({ success: false, msg: 'User disabled!' });
        } else {

            // if found
            User.comparePassword(password, user.password, (err, isMatch) => {
                console.log(err)
                if (err) throw err;
                if (isMatch) {
                    // create token
                    const token = jwt.sign({ userId: user._id, username: user.username},config.secret,{
                        // const token = jwt.sign({ userId: user._id, userID: user.userID, username: user.fname, userRights: user.rights }, config.secret, {
                        //expire after a week
                        expiresIn: 604800
                    });

                    // User.findByIdAndUpdate(user._id,{ loggedInStatus: true },(err,update) => {});
                    return res.json([{
                        success: true, token: token, user:
                            { id: user._id, username: user.username,}
                    }]);
                }
                else {
                    //password doesn't match
                    return res.json({ success: false, msg: 'Username and password did not match! Please try again' });
                }
            });
        }
    });
});

// get user data
router.get('/getUserData/:user', function(req, res){
    User.getUserData(req.params.user, (err, users) =>{
        if(err) throw err;
        res.json(users);
    });
});


router.get('/getUsers', (req, res) => {
    User.getUsers( req.body, data => {
        res.json(data)
    });
})

router.post('/updateUser', (req, res) => {
    var a = req.body;
    User.updateUser(a,data => {
        res.json(data)
    });
});
module.exports = router
