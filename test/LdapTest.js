var ldap = require('ldapjs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var lEntry = require('./ldapEntry.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ldap');

var dnGroup = 'OU=MaryTest,DC=Testing,DC=com';
var client = ldap.createClient({url:'ldap://192.168.1.145:389'});
//var queryId = uuid.v1();

client.bind('CN=Administrator,CN=Users,DC=Testing,DC=com','P@ssw0rd', function(err){
    if(err)
      console.log('error: login failed' + err.message);
})

var opts = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    attributes: ['dn','cn','objectguid'],
    paging: {
        pageSize: 1000,
        pagePause: true
    }
}

function convertLdapEntry(qId, ogid, entry){
    return new lEntry({
        queryId : qId,
        dn : entry.dn,
        objectGuid : ogid,
        rawObject : entry.object,
        receivedTime : new Date()
    });
}


client.search(dnGroup, opts, function(err, res){
     res.on('searchEntry', function(entry){
        console.log('guid: ' + objectGuidToString(entry.raw.objectGUID));
     });

     res.on('searchReference', function(ref){
         console.log('reference: ' + ref.uris.join());
     });

     res.on('error', function(err){
         console.log('error: ' + err.message);
     });

     res.on('end', function(result){
         console.log('status: ' + result.status);
         process.exit();
     });
});

function objectGuidToString(buffer){
    var encodeString='';
    for(var i = 0; i < buffer.byteLength; i++){
        encodeString += buffer[i].toString();
    }
    return encodeString;
    // return crypto.createHash('md5').update(encodeString).digest('hex');
}

