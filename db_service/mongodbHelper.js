var MongoClient = require('mongodb').MongoClient;

var conectionUrl = 'mongodb://localhost:27017/ldap';

var insertObjects = function (obj, collection) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [insertObjects]' + err.message)
    }
    var collections = db.collection(collection);
    collections.insert(obj, function (error, result) {
      if (error) {
        console.log('DBError: Insert Object Error!' + error.message)
      }
      db.close();
    });
  });
}


var findObjects = function (filter, collection, callback) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjects]' + err.message)
    }
    db.collection(collection).find(filter).toArray(callback);
    db.close();
  });
}

var findObjectsWithResult = function (filter, collection, callback) {
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjectsWithResult] ' + err.message)
    }
    db.collection(collection).find(filter).toArray(callback);
    db.close();
  });
}


var findObjectsV2 = function (filter, collection, callback) {
  entries = [];
  MongoClient.connect(conectionUrl, function (err, db) {
    if (err) {
      console.log('DBError: Connection Error! [findObjectsV2] ' + err.message)
    }
    var cursor = db.collection(collection).find(filter);
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