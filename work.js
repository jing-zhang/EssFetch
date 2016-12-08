var rabbitmqHelper = require('./mq_service/rabbitHelper');
var members = require('./google_service/memberList');
var ldapHeler = require('./ldap_service/ldapHelper');
var mongodbHelper = require('./db_service/mongodbHelper');
var uuid = require('node-uuid')
var saveToDB = true;


var apiCall = function apiCall(msg) {
    //QueryId StampID
    var queryId = uuid.v1();
    if (msg.type === 'ldap') {
        processLdap(queryId, msg)
    } else {
        processGoogle(queryId, msg)
    }
}


function processLdap(queryId, msg) {
    var stamp = ldapHeler.buildStampObject(queryId, msg.ldapUrl, msg.ou, msg.dnGroup);
    if (saveToDB) {
        filter = {
            ou: stamp.ou,
            dnGroup: stamp.dnGroup,
            expireTime: { $gte: stamp.startTime }
        }
        mongodbHelper.findObjects(filter, 'stamps', function (err, result) {
            if (result.length) {
                // already downloaded, move to next queue
                console.log("Already downloaded,  %s , %s ", msg.ou, msg.dnGroup)
                return;
            }
            else {
                mongodbHelper.insertObjects(stamp, 'stamps');
                fetchLdap(msg, queryId, saveToDB)
            }
        });
    }
    else {
        fetchLdap(msg, queryId, saveToDB)
    }
}

function fetchLdap(msg, queryId, saveToDB) {
    //Generate ldap Client
    var client = ldapHeler.buildClient(msg.ldapUrl, msg.ou, msg.password);
    //Fetch Data
    ldapHeler.fetchData(client, msg.dnGroup, msg.opts, queryId, saveToDB);
}

function processGoogle(queryId, msg) {
    var stamp = members.buildStampObject(queryId, msg.clientId, msg.groupKey);
    if (saveToDB) {
        filter = {
            clientId: stamp.clientId,
            groupKey: stamp.groupKey,
            expireTime: { $gte: stamp.startTime }
        }
        mongodbHelper.findObjects(filter, 'stamps', function (err, result) {
            if (result.length) {
                // already downloaded, move to next queue
                console.log("Already downloaded,  %s , %s ", msg.clientId, msg.groupKey)
                return;
            }
            else {
                mongodbHelper.insertObjects(stamp, 'stamps');
                fetchGoogle(msg, queryId, saveToDB);
            }
        });
    }
    else {
        fetchGoogle(msg, queryId, saveToDB);
    }
}

function fetchGoogle(msg, queryId, saveToDB) {
    //Generate OauthCredtial Client
    var client = members.buildOauthClient(msg.clientId, msg.clientSecret, msg.refreshToken)
    //Fetch Data
    members.fetchMembers(client, msg.groupKey, queryId, saveToDB);
}


rabbitmqHelper.consumeTask('google', apiCall);

rabbitmqHelper.consumeTask('ldap', apiCall);