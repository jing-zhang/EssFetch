var ldap = require('ldapjs');
var mongodbhelper = require('./mongodbhelper');
var ldapDbHelper = require('./ldapDbHelper');
var ldapModel = require('./ldapModel');
var uuid = require('node-uuid');

var dnGroup = 'OU=MaryTest,DC=Testing,DC=com';
var client = ldap.createClient({url:'ldap://192.168.1.145:389'});
var queryId = uuid.v1();

client.bind('CN=Administrator,CN=Users,DC=Testing,DC=com','P@ssw0rd', function(err){
    if(err)
      console.log('error: login failed' + err.message);
});


var opts = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    attributes: ['dn','cn','objectguid'],
    paging: {
        pageSize: 1000,
        pagePause: true
    }
}


function convertLdapModelEntry(qId, ogid, entry){
    var ent = new ldapModel({
            queryId : qId,
            dn : entry.dn,
            objectGuid : ogid,
            rawObject : entry.object,
            receivedTime : new Date()
            });
    return ent;
}

function convertLdapEntry(qId, ogid, entry){
    var ent = {
            queryId : qId,
            dn : entry.dn,
            objectGuid : ogid,
            rawObject : entry.object,
            receivedTime : new Date()
            }
    return ent;
}

function objectGuidToString(buffer){
    var encodeString='';
    for(var i = 0; i < buffer.byteLength; i++){
        encodeString += buffer[i].toString()+',';
    }
    return encodeString;
}

var entries = [];

fetchLdapData = client.search(dnGroup, opts, function(err, res){
     res.on('searchEntry', function(entry){
        var gid = objectGuidToString(entry.raw.objectGUID);
        //Save To DB by mongoose
        //var lEntry = convertLdapModelEntry(queryId, gid, entry); 
        //mongoosehelper.insertObject(lEntry);
        
        //Save to DB by mongodb
        var lsEntry = convertLdapEntry(queryId, gid, entry);
        ldapDbHelper.insertObject(lsEntry);
        //entries.push(lsEntry);

     });
     res.on('searchReference', function(ref){
         console.log('reference: ' + ref.uris.join());
     });

     res.on('error', function(err){
         console.log('error: ' + err.message);
     });

     res.on('end', function(result){
         console.log('status: ' + result.status);
         //ldapDbHelper.insertObject(entries);
         //process.exit();
     });
});


module.exports = {
    fetchData : fetchLdapData
}