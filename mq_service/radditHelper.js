var amqp = require('amqplib');
//var google = require('googleapis');
//var googleAuth = require('google-auth-library');
//var members = require('.././google_service/memberlist');
var radditmqUrl = 'amqp://localhost';

var consumeTask = function pickupTask(channel, callback){
  amqp.connect(radditmqUrl).then(function(conn){
    return conn.createChannel().then(function(ch){
      var ok = ch.assertQueue(channel, {durable: false});
      ok = ok.then(function(_qok) {
      return ch.consume(channel, function(msg) {
        var oa = JSON.parse(msg.content.toString())
        console.log(" [x] Received '%s'", msg.content.toString());
        // //Create oauth2Client
        // var auth = new googleAuth();
        // var oauth2Client = new auth.OAuth2(oa.clientId, oa.clientSecret, null);
        // oauth2Client.credentials.refresh_token = oa.refreshToken;
        // //Fetch Data
        // members.fetchMembersToConsole(oauth2Client,oa.groupKey);
        callback(oa);
      }, {noAck: true});
    });
    });
  });
}

var sendTask = function senderTask(channel, msg) {
    amqp.connect(radditmqUrl).then(function(conn){
    return conn.createChannel().then(function(ch){
      var ok = ch.assertQueue(channel, {durable: false});
      ok = ok.then(function(_qok) {
      return ch.sendToQueue(channel, new Buffer(msg));
    });
    });
  });
}


module.exports = {
    sendTask : sendTask,
    consumeTask : consumeTask
}