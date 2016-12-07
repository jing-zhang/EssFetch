var google = require('googleapis');
var googleAuth = require('google-auth-library');
var mongodbHelper = require('.././db_service/mongodbHelper');

var count = 0;


function fetchPageUsers(oauth2Client, pageToken, queryId, saveToDB, callback) {
  var service = google.admin('directory_v1');
  service.users.list({
    auth: oauth2Client,
    customer: 'my_customer',
    maxResults: 100,
    pageToken: pageToken,
    orderBy: 'email'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var users = response.users;
    if (users.length == 0) {
      console.log('No users in the domain.');
    } else {
      console.log('Users:');
      for (var i = 0; i < users.length; i++) {
        count++;
        var user = users[i];
        if (saveToDB) {
          user["queryId"] = queryId;
          mongodbHelper.insertObjects(user, 'google');
        } else {
          console.log('%d %s (%s)', count, user.primaryEmail, user.name.fullName);
        }
      }
      if (response.nextPageToken)
        callback(oauth2Client, response.nextPageToken, fetchPageUsers);
      else
        console.log('End of Reuest : total %d users', count);
    }
  });
}


function FetchUsers(oauth2Client, queryId, saveToDB) {
  fetchPageUsers(oauth2Client, null, queryId, saveToDB, fetchPageUsersToDB);
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

var buildOauthClient = function (clientID, clientSecret, refreshToken) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientID, clientSecret, null);
  oauth2Client.credentials.refresh_token = refreshToken;
  return oauth2Client;
};


module.exports = {
  fetchUsers: FetchUsers,
  buildStampObject: buildStampObject,
  buildOauthClient: buildOauthClient
}