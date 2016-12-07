var amqp = require('amqplib');
var radditmqUrl = 'amqp://localhost';

var consumeTask = function pickupTask(channel, callback){
  amqp.connect(radditmqUrl).then(function(conn){
    return conn.createChannel().then(function(ch){
      var ok = ch.assertQueue(channel, {durable: false});
      ok = ok.then(function(_qok) {
      return ch.consume(channel, function(msg) {
        var oa = JSON.parse(msg.content.toString())
        console.log(" [%s] Received '%s'",channel, msg.content.toString());
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
      console.log("[%s] Sent '%s'",channel, JSON.stringify(msg));
      return ch.sendToQueue(channel, new Buffer(msg));
    });
    });
  });
}


module.exports = {
    sendTask : sendTask,
    consumeTask : consumeTask
}