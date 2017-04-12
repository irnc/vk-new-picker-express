const express = require('express');
const router = express.Router();
const pool = require('../DB/Pool');
const PreferenceController = require('../controllers/preferenceController');

router.get('/', function (req, res, next) {
    PreferenceController.getAllPreferences(req, res, pool, function (err, preferences) {
        err ? next(err) : res.send(preferences);
    });
});

module.exports = router;