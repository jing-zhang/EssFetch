var google = require('googleapis');
var googleAuth = require('google-auth-library');
var mongodbHelper = require('.././db_service/mongodbHelper');

var count = 0;


function fetchPageGroups(oauth2Client,pageToken,queryId,saveToDB,callback) {
  var service = google.admin('directory_v1');
  service.groups.list({
    auth: oauth2Client,
    customer: 'my_customer',
    maxResults: 100,
    pageToken: pageToken,
    orderBy: 'email'
  }, function(err, response) {
     if (err) {
       console.log('The API returned an error: ' + err);
       return;
     }
    var groups = response.groups;
    if (groups.length == 0) {
      console.log('No users in the domain.');
    } else {
      console.log('Users:');
      for (var i = 0; i < groups.length; i++) {
        count++;
        var group = groups[i];
        if(saveToDB)
        {
          group["queryId"]=queryId;
          mongodbHelper.insertObjects(group, 'google');
        }
        else
          console.log('%d groupKey: %s',count, group.email);
      }
      if(response.nextPageToken)
        callback(oauth2Client,response.nextPageToken,queryId,saveToDB,fetchPageGroups);
    }
  });
}

var buildStampObject = function (queryId, clientId, groupKey) {
  var now = new Date();
  var stampObject = {
    queryId: queryId,
    clientId: clientId,
    groupKey: groupKey,
    startTime: now,
    expireTime: new Date(now.getTime() + (3 * 3600 * 1000))
  }

  return stampObject;
};

var buildOauthClient = function(clientID, clientSecret, refreshToken) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientID, clientSecret, null);
  oauth2Client.credentials.refresh_token = refreshToken;
  return oauth2Client;
};

function FetchGroups(oauth2Client, queryId, saveToDB)
{
  fetchPageGroupsToDB(oauth2Client,null,queryId,saveToDB,fetchPageGroupsToDB);
}

module.exports = {
    fetchGroups : FetchGroups,
    buildStampObject: buildStampObject,
    buildOauthClient: buildOauthClient
}
