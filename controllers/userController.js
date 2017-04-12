const UserDAO = require('../dao/userDAO');
const createConnection = require('../DB/Connection');

class UserController {

    getUserById(req, res, pool, id, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                callback(err);
            } else {
                UserDAO.getUserById(connection, id, function (err, user) {
                    if (err || user === null) {
                        console.error(err !== null ? err : "");
                        connection.release();
                        callback(err);
                    } else {
                        connection.release();
                        callback(err, user);
                    }
                });
            }
        });
    };

    getAllUsers(req, res, pool, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
            } else {
                UserDAO.getAllUsers(connection, function (err, users) {
                    if (err || users === null) {
                        console.error(err !== null ? err : "");
                        connection.release();
                        callback(err);
                    } else {
                        connection.release();
                        callback(err, users);
                    }
                });
            }
        });
    };

    addUser(req, res, pool, id, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                callback(err);
            } else {
                UserDAO.addUser(connection, id, function (err) {
                    console.error(err !== null ? err : "");
                    connection.release();
                    callback(err);
                });
            }
        });
    };

    deleteUser(req, res, pool, id, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                return callback(err);
            } else {
                UserDAO.deleteUser(connection, id, function (err) {
                    console.error(err !== null ? err : "");
                    connection.release();
                    return callback(err);
                });
            }
        });
    };


}


module.exports = new UserController();