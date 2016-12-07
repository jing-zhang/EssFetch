var rabbitmqHelper = require('./mq_service/rabbitHelper');
var members = require('./google_service/memberList');
var ldapHeler = require('./ldap_service/ldapHelper');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var uuid = require('node-uuid')
var saveToDB = false;


var apiCall = function apiCall(msg) {
    //QueryId StampID
    var queryId = uuid.v1();
    var stamp = {};
    if(msg.type === 'ldap'){
        processLdap(queryId, msg)
    }else{
        processGoogle(queryId, msg)
    }
}

function processLdap(queryId, msg)
{
    stamp = ldapHeler.buildStampObject(queryId, msg.ldapUrl, msg.ou, msg.dnGroup);
    if(saveToDB)
        mongodbHelper.insertObjects(stampObject, 'stamps');
    var client = ldapHeler.buildClient(msg.ldapUrl, msg.ou, msg.password);
    //Fetch Data
    ldapHeler.fetchData(client,msg.dnGroup, msg.opts, queryId, saveToDB);
}

function processGoogle(queryId, msg)
{
    stamp = members.buildStampObject(queryId,msg.clientId, msg.groupKey);
    if(saveToDB)
        mongodbHelper.insertObjects(stampObject, 'stamps');
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(msg.clientId, msg.clientSecret, null);
    oauth2Client.credentials.refresh_token = msg.refreshToken;
    //Fetch Data
    members.fetchMembers(oauth2Client,msg.groupKey,queryId, saveToDB);
}


rabbitmqHelper.consumeTask('google', apiCall);

//radditmqHelper.consumeTask('ldap', apiCall);