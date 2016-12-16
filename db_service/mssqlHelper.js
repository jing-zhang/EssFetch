var sqlDb = require('mssql');

var config = require('./setting.json')

exports.executeQuery = function (sql, callback) {
    var conn = new sqlDb.Connection(config);
    conn.connect()
        .then(function () {
            var req = new sqlDb.Request(conn);
            req.query(sql)
                .then(function (recordset) {
                    callback(recordset);

                })
                .catch(function (err) {
                    console.log(err);
                    callback(null, err);
                });

        })
        .catch(function (err) {
            console.log(err);
            callback(null, err);
        });
};