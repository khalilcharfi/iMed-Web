const Shelter = require('../models/shelter');
const config = require('../config/database');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/addShelter', (req, res) => {
    var a = req.body;
    Shelter.addShelter(a,data => {
        res.json(data)
    });
});
router.get('/getShelter', (req, res) => {
    Shelter.getShelter( req.body, data => {
        res.json(data)
    });
});
router.get('/getArchiveShelter', (req, res) => {
    Shelter.getArchiveShelter( req.body, data => {
        res.json(data)
    });
})
router.post('/updateShelter', (req, res) => {
    var a = req.body;
    Shelter.updateShelter(a,data => {
        res.json(data)
    });
});
router.post('/updatearchive', (req, res) => {
    var a = req.body;
    Shelter.updatearchive(a,data => {
        res.json(data)
    });
});

router.post('/getShelterDetails', (req, res) => {
    var a = req.body;
    Shelter.getShelterDetails(a,data => {
        res.json(data)
    });
});

module.exports = router
