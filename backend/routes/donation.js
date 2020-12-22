const Donation = require('../models/donation');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addDonation', (req, res) => {
    var a = req.body;
   Donation.addDonation(a,data => {
        res.json(data)
    });
});
router.get('/getDonation', (req, res) => {
    Donation.getDonation( req.body, data => {
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
