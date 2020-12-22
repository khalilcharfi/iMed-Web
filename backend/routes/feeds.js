const NewsFeeds = require('../models/feeds');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addPost', (req, res) => {
    var a = req.body;
    NewsFeeds.addPost(a,data => {
        res.json(data)
    });
});
router.get('/getPost', (req, res) => {
    NewsFeeds.getPost( req.body, data => {
        res.json(data)
    });
});
router.post('/pushComment', (req, res) => {
    var a = req.body;
    NewsFeeds.pushComment(a,data => {
        res.json(data)
    });
});
router.post('/updateDonation', (req, res) => {
    var a = req.body;
    Donation.updateDonation(a,data => {
        res.json(data)
    });
});

module.exports = router
