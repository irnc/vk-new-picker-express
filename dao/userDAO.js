let User = require('../models/User');
const mysql = require('mysql');

class UserDAO {

    getUserById(connection, id, callback) {
        if (id != "" && id != undefined && id != null) {
            let queryString = 'SELECT * FROM user_vk_id WHERE id =' + mysql.escape(id);
            connection.query(queryString, function (err, results, fields) {
                if (err) {
                    return callback(err);
                }
                if (results.length === 0) {
                    return callback(null, null);
                }
                else {
                    let user = new User(results[0].id, results[0].name);
                    callback(err, user);
                }
            });
        } else {
            callback(new Error("ID is not valid"));
        }
    }


    getAllUsers(connection, callback) {
        let users = [];
        connection.query("SELECT * FROM user_vk_id", function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            for (let i = 0; i < results.length; i++) {
                users[i] = new User(results[i].id);
            }
            return callback(err, users);
        });
    }


    addUser(connection, id, callback) {
        if (id != "" && id != undefined && id != null && id > 0) {
            connection.query('INSERT INTO user_vk_id SET ?', {id: id}, function (err, results, fields) {
                return callback(err);
            });
        } else {
            return callback(new Error("ID is not valid"));
        }
    }


    deleteUser(connection, id, callback) {
        if (id != "" && id != undefined && id != null && id > 0) {
            connection.query('DELETE FROM user_vk_id WHERE id = ' + mysql.escape(id), function (err, results, fields) {
                return callback(err);
            });
        } else {
            return callback(new Error("ID is not valid"));
        }
    }

}

module.exports = new UserDAO();
