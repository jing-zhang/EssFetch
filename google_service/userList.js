var google = require('googleapis');
var googleAuth = require('google-auth-library');
var mongodbHelper = require('.././db_service/mongodbHelper');

var count =0;


function fetchPageUsers(oauth2Client,pageToken,queryId, saveToDB, callback) {
  var service = google.admin('directory_v1');
  service.users.list({
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
    var users = response.users;
    if (users.length == 0) {
      console.log('No users in the domain.');
    } else {
      console.log('Users:');
      for (var i = 0; i < users.length; i++) {
        count++;
        var user = users[i];
        if(saveToDB){
          user["queryId"]= queryId;
          mongodbHelper.insertObjects(user, 'google');
        } else {
        console.log('%d %s (%s)',count, user.primaryEmail, user.name.fullName);
        }
      }
      if(response.nextPageToken)
        callback(oauth2Client,response.nextPageToken, fetchPageUsers);
      else
        console.log('End of Reuest : total %d users',count);
    }
  });
}


function FetchUsers(oauth2Client, queryId,saveToDB)
{
  fetchPageUsers(oauth2Client,null,queryId,saveToDB,fetchPageUsersToDB);
}


module.exports = {
    fetchUsers : FetchUsers
}