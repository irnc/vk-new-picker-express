const express = require('express');
const router = express.Router();
const pool = require('../DB/Pool');
const UserController = require('../controllers/userController');
const UserPreferenceController = require('../controllers/userPreferenceController');


router.get('/id/:id', function (req, res, next) {
    UserController.getUserById(req, res, pool, req.params.id, function (err, user) {
        err ? next(err) : res.send(user);
    });
});

router.get('/id/:id/preferences', function (req, res, next) {
    UserPreferenceController.getUserPreferencesByUserId(req, res, pool, req.params.id, function (err, user_preferences) {
        err ? next(err) : res.send(user_preferences);
    });
});

router.post('/id/:id/preference/:preference', function (req, res, next) {
    UserPreferenceController.mapUserByPreference(req, res, pool, req.params.id, req.params.preference,
        function (err, user_preferences) {
            err ? next(err) : res.send(user_preferences);
        });
});

router.post('/id/:id', function (req, res, next) {
    UserController.addUser(req, res, pool, req.params.id, function (err) {
        err ? next(err) : res.end();
    });
});

router.delete('/id/:id', function (req, res, next) {
    UserController.deleteUser(req, res, pool, req.params.id, function (err) {
        err ? next(err) : res.end();
    });
});


module.exports = router;
