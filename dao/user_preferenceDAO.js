let User_Preference = require('../models/User_Preference');
const mysql = require('mysql');
const PreferenceDAO = require('../dao/preferenceDAO');
const waterfall = require('async/waterfall');

class UserPreferenceDAO {

    getUserPreferenceIdById(connection, id, callback) {
        if (id != "" && id != undefined && id != null) {
            let user_preferences;
            let queryString = 'SELECT preference FROM vk_news_picker.user_preference u ' +
                'LEFT JOIN vk_news_picker.preference p ON u.preference_id=p.id WHERE u.user_vk_id=' + mysql.escape(id);
            connection.query(queryString, function (err, results, fields) {
                if (err) {
                    return callback(err);
                }
                if (results.length === 0) {
                    return callback(err);
                }
                else {
                    user_preferences = new User_Preference(id);
                    for (let i = 0; i < results.length; i++) {
                        user_preferences.preference.push(results[i].preference)
                    }
                    return callback(err, user_preferences);
                }
            });
        } else {
            return callback(new Error("Id is NULL"));
        }
    }

    mapUserByPreference(connection, user_id, preference, callback) {
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            waterfall([
                (callback) => getPreferenceIdByTitle(connection, preference, callback),
                (existingPreferenceId, callback) => addPreference(connection, preference, existingPreferenceId, callback),
                (preferenceId, callback) => mapUserByPreference(connection, user_id, preferenceId, callback),
            ], function (err, result) {
                connection.rollback();
                return callback(err, result);
            });


        });

        function getPreferenceIdByTitle(callback) {
            PreferenceDAO.getPreferenceIdByTitle(connection, preference, function (err, preference_id) {
                if (err || preference_id === null) {
                    console.error(err !== null ? err : "");
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    return callback(err, preference_id);
                }
            });
        }

        function addPreference(connection, newPreference, existingPreferenceId, callback) {          
            if (existingPreferenceId) {
                return callback(err, existingPreferenceId);
            }

            PreferenceDAO.insertPreference(connection, preference, function (err, preference_id) {
                if (err || preference_id === null) {
                    console.error(err !== null ? err : "");
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    return callback(err, preference_id);
                }
            });
        }

        function mapUserByPreference(connection, userId, prefernceId, callback) {
            connection.query("INSERT INTO user_preference SET ?",
                {
                    user_vk_id: user_id,
                    preference_id: preference_id
                }, function (err, results, fields) {
                    return callback(err);
                });
        }

    }


}

module
    .exports = new UserPreferenceDAO();
