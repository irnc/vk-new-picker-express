let Preference = require('../models/Preference');
const mysql = require('mysql');

class PreferenceDAO {

    insertPreference(connection, preference, callback) {
        connection.query("INSERT INTO preference SET ?", {preference: preference}, function (err, results, fields) {
            return callback(err);
        });
    }

    deletePreference(connection, preference, callback) {
        connection.query("DELETE FROM preference WHERE preference.preference = " + mysql.escape(preference),
            function (err, results, fields) {
                return callback(err);
            });
    }

    getPreferenceIdByTitle(connection, title, callback) {
        connection.query("SELECT id FROM preference WHERE preference.preference = " + mysql.escape(title),
            function (err, results, fields) {
                if (err) {
                    return callback(err);
                }
                return callback(err, results[0].id);
            });
    }

    getAllPreferences(connection, callback) {
        let preferences = [];
        connection.query("SELECT * FROM preference", function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            for (let i = 0; i < results.length; i++) {
                preferences[i] = new Preference(results[i].id, results[i].preference);
            }
            callback(err, preferences);
        });
    }

}

module.exports = new PreferenceDAO();
