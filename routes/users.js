const express = require('express');
const UserController = require("../controllers/userController.js");
const router = express.Router();
const pool = require('../DB/Pool');


router.get('/', function(req, res, next) {
    UserController.getAllUsers(req, res, pool, function (err, users) {
        err ? next(err) : res.send(users);
    });
});

module.exports = router;
