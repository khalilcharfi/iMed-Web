const Quake = require('../models/quake');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addQuake', (req, res) => {
    var a = req.body;
    Quake.addQuake(a,data => {
        res.json(data)
    });
});
router.get('/getQuake', (req, res) => {
    Quake.getQuake( req.body, data => {
        res.json(data)
    });
});
router.get('/getArchiveQuake', (req, res) => {
    Quake.getArchiveQuake( req.body, data => {
        res.json(data)
    });
});
router.post('/updateQuake', (req, res) => {
    var a = req.body;
    Quake.updateQuake(a,data => {
        res.json(data)
    });
});
router.post('/updatearchive', (req, res) => {
    var a = req.body;
    Quake.updatearchive(a,data => {
        res.json(data)
    });
});

module.exports = router
