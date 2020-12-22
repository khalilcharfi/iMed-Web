const Contact = require('../models/contact');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addContact', (req, res) => {
    var a = req.body;
    Contact.addContact(a,data => {
        res.json(data)
    });
});
router.get('/getContact', (req, res) => {
    Contact.getContact( req.body, data => {
        res.json(data)
    });
});
router.post('/updateContact', (req, res) => {
    var a = req.body;
    Contact.updateContact(a,data => {
        res.json(data)
    });
});
module.exports = router
