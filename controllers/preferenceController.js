const PreferenceDAO = require('../dao/preferenceDAO');
const createConnection = require('../DB/Connection');

class PreferenceController {

    getAllPreferences(req, res, pool, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
            } else {
                PreferenceDAO.getAllPreferences(connection, function (err, preferences) {
                    if (err || preferences === null) {
                        console.error(err !== null ? err : "");
                        connection.release();
                        return callback(err);
                    } else {
                        connection.release();
                        return callback(err, preferences);
                    }
                });
            }
        });
    };

    insertPreference(req, res, pool, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                return callback(err);
            } else {
                PreferenceDAO.insertPreference(connection, req.params.preference, function (err) {
                    connection.release();
                    return callback(err);
                });
            }
        });
    };

    deletePreference(req, res, pool, callback) {
        createConnection(pool, function (err, connection) {
            if (err) {
                connection.release();
                return callback(err);
            } else {
                PreferenceDAO.deletePreference(connection, req.param('preference'), function (err) {
                    connection.release();
                    return callback(err);
                });
            }
        });
    };

}


module.exports = new PreferenceController();