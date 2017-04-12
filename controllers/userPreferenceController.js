const createConnection = require('../DB/Connection');
const User_preferenceDAO = require('../dao/user_preferenceDAO');

class UserPreferenceController {


    mapUserByPreference(req, res, pool, id, preference, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                callback(err);
            } else {
                User_preferenceDAO.mapUserByPreference(connection, id, preference, function (err) {
                    console.error(err !== null ? err : "");
                    connection.release();
                    callback(err);
                });
            }
        });
    };

    getUserPreferencesByUserId(req, res, pool, id, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                callback(err);
            } else {
                User_preferenceDAO.getUserPreferenceIdById(connection, id, function (err, user_preferences) {
                    if (err || user_preferences === null) {
                        connection.release();
                        callback(err);
                    } else {
                        connection.release();
                        callback(err, user_preferences);
                    }
                });
            }
        });
    };

}

module.exports = new UserPreferenceController();