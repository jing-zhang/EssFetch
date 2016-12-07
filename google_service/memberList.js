var google = require('googleapis');
var googleAuth = require('google-auth-library');
var mongodbHelper = require('.././db_service/mongodbHelper');
var count = 0;

function fetchPageMembers(oauth2Client, groupKey, pageToken, queryId, saveToDB, callback) {
  var service = google.admin('directory_v1');
  service.members.list({
    auth: oauth2Client,
    groupKey: groupKey,
    maxResults: 10,
    pageToken: pageToken,
    fields: 'etag,kind,members,nextPageToken'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var members = response.members;
    if (members.length == 0) {
      console.log('No users in the domain.');
    } else {
      for (var i = 0; i < members.length; i++) {
        count++;
        var member = members[i];
        member["queryId"] = queryId;
        if (saveToDB)
          mongodbHelper.insertObjects(member, 'google');
        else
          console.log('%d %s (%s)', count, member.email, JSON.stringify(member));
      }
      if (response.nextPageToken)
        callback(oauth2Client, groupKey, response.nextPageToken, queryId, saveToDB, fetchPageMembers);
      else {
        console.log('End of Request : total %d members', count);
        count = 0;
      }
    }
  });
}


function FetchMembers(oauth2Client, groupKey, queryId, saveToDB) {
  fetchPageMembers(oauth2Client, groupKey, null, queryId, saveToDB, fetchPageMembers);
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
}

var buildOauthClient = function (clientID, clientSecret, refreshToken) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientID, clientSecret, null);
  oauth2Client.credentials.refresh_token = refreshToken;
  return oauth2Client;
}

module.exports = {
  fetchMembers: FetchMembers,
  buildStampObject: buildStampObject,
  buildOauthClient: buildOauthClient
}