var MongoClient = require('mongodb').MongoClient;

var conectionUrl = 'mongodb://localhost:27017/ldap';

var insertObjects = function (obj, cll) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [insertObjects]' + err.message)
    }
    var collections = db.collection(cll);
    collections.insert(obj, function (error, result) {
      if (error) {
        console.log('DBError: Insert Object Error!' + error.message)
      }
      db.close();
    });
  });
}


var findObjects = function (filter, cll, callback) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjects]' + err.message)
    }
    db.collection(cll).find(filter).toArray(callback);
    db.close();
  });
}

var findObjectsWithResult = function (filter, cll, callback) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjectsWithResult] ' + err.message)
    }
    db.collection(cll).find(filter).toArray(callback);
    db.close();
  });
}


var findObjectsV2 = function (filter, cll, callback) {
  entries = [];
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjectsV2] ' + err.message)
    }
    var cursor = db.collection(cll).find(filter);
    cursor.each(function (err, doc) {
      if (doc) {
        entries.push(doc);
      } else
        callback();
    });
    db.close();
    return entries;
  });
}

module.exports = {
  insertObjects: insertObjects,
  findObjects: findObjects,
  findObjectsWithResults: findObjectsWithResult,
  findObjectsv2: findObjectsV2
}