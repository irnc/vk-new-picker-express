const express = require('express');
const router = express.Router();
const pool = require('../DB/Pool');
const PreferenceController = require('../controllers/preferenceController');

router.post('/:preference', function (req, res, next) {
    PreferenceController.insertPreference(req, res, pool, function (err) {
        err ? next(err) : res.end();
    });
});

router.delete('/:preference', function (req, res, next) {
    PreferenceController.deletePreference(req, res, pool, function (err) {
        err ? next(err) : res.end();
    });
});


module.exports = router;
