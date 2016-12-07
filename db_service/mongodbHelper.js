var MongoClient = require('mongodb').MongoClient;

var conectionUrl = 'mongodb://localhost:27017/ldap';

var insertObjects = function(obj, cll){
    MongoClient.connect(conectionUrl, function(err,db){
    var collections = db.collection(cll);
    collections.insert(obj, function(error, result){
    db.close();
    });
  });
}


var findObjects = function(filter,cll,callback){
    MongoClient.connect(conectionUrl, function(err,db){
    db.collection(cll).find(filter).toArray(callback);
    db.close();
  });
}

var findObjectsWithResult = function(filter,cll, callback){
    MongoClient.connect(conectionUrl, function(err,db){
    db.collection(cll).find(filter).toArray(callback);
    db.close();
  });
}


var findObjectsV2 = function(filter, cll, callback){
    entries  = [];
    MongoClient.connect(conectionUrl, function(err, db){
      var cursor = db.collection(cll).find(filter);
      cursor.each(function(err, doc){
        if(doc) {
          entries.push(doc);
        }else
          callback();
      });
      db.close();
      return entries;
    });
}

module.exports = {
    insertObjects : insertObjects,
    findObjects : findObjects,
    findObjectsWithResults : findObjectsWithResult,
    findObjectsv2 : findObjectsV2
}