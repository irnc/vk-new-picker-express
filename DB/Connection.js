module.exports = function createConnection(pool, callback) {
    pool.getConnection(function (err, connection) {
        return err ? callback(err) : callback(err, connection);
    });
};