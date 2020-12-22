const Image = require('../models/image');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addImage', (req, res) => {
    req.body.useFor = 'donation';
    req.body.uploadPath = 'donations';
    Image.addImage(req,data => {
        res.json(data)
    });
});

router.post('/addImageProfile', (req, res) => {
    req.body.useFor = 'profile';
    req.body.uploadPath = 'profile';
    Image.addImage(req,data => {
        res.json(data)
    });
});
router.post('/removeImageProfile', (req, res) => {
    req.body.uploadPath = 'profile';
    Image.removeImageProfile(req,data => {
        res.json(data)
    });
});
router.post('/addImageFeeds', (req, res) => {
    req.body.useFor = 'news-feeds';
    req.body.uploadPath = 'news-feeds';
    Image.addImage(req,data => {
        res.json(data)
    });
});

module.exports = router
