const Relief = require('../models/relief');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addRelief', (req, res) => {
    var a = req.body;
    Relief.addRelief(a,data => {
        res.json(data)
    });
});
router.get('/getRelief', (req, res) => {
    Relief.getRelief( req.body, data => {
        res.json(data)
    });
});
router.get('/getArchiveRelief', (req, res) => {
    Relief.getArchiveRelief( req.body, data => {
        res.json(data)
    });
});
router.post('/updateRelief', (req, res) => {
    var a = req.body;
    Relief.updateRelief(a,data => {
        res.json(data)
    });
});
router.post('/updatearchive', (req, res) => {
    var a = req.body;
    Relief.updatearchive(a,data => {
        res.json(data)
    });
});

module.exports = router
