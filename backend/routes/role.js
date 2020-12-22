const Role = require('../models/role');
const router = require('express').Router();

router.post('/addRole', (req, res) => {
    var a = req.body;
    Role.addRole(a,data => {
        res.json(data)
    });
});

router.get('/getRoles', (req, res) => {
    Role.getRoles( req.body, data => {
        res.json(data)
    });
})
module.exports = router
