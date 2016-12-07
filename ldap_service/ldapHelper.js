var ldapjs = require('ldapjs');
var mongodbHelper = require('.././db_service/mongodbHelper');


function objectGuidToString(buffer){
    var encodeString='';
    for(var i = 0; i < buffer.byteLength; i++){
        encodeString += buffer[i].toString()+',';
    }
    return encodeString;
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

var fetchData = function(client,dnGroup, opts, queryId, toDB){
    client.search(dnGroup, opts, function(err, res){
     res.on('searchEntry', function(entry){
        var gid = objectGuidToString(entry.raw.objectGUID);
        
        //Save to DB by mongodb
        var lsEntry = convertLdapEntry(queryId, gid, entry);
        if(toDB)
            mongodbHelper.insertObjects(lsEntry, 'ldap');
        else
            console.log(JSON.stringify(lsEntry));
     });
     res.on('searchReference', function(ref){
         console.log('reference: ' + ref.uris.join());
     });

     res.on('error', function(err){
         console.log('error: ' + err.message);
     });

     res.on('end', function(result){
         console.log('status: ' + result.status);
     });
});
}

var buildClient = function(url, ou, password){
    var client = ldapjs.createClient({url:url});
    client.bind(ou,password, function(err){
        if(err)
        console.log('error: login failed' + err.message);
    });

    return client;
}

var buildStampObject = function(queryId, ldapUrl, ou, dnGroup){
    var now = new Date();
    var stampObject ={
    queryId : queryId,
    url : ldapUrl,
    ou : ou,
    dnGroup : dnGroup,
    startTime : now,
    expireTime : new Date(now.getTime()+ (3*3600*1000))
}

    return stampObject;
}


module.exports = {
    buildStampObject : buildStampObject,
    buildClient : buildClient,
    fetchData : fetchData
}