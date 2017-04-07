var amqp = require('amqplib');
var radditmqUrl = 'amqp://localhost';

var consumeTask = function (channel, callback) {
  amqp.connect(rabbitmqUrl, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue(channel, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", channel);
        ch.consume(channel, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            callback(msg.content.toString());
        }, {noAck: true});
    });
});
}

var sendTask = function (channel, msg) {
  amqp.connect(rabbitmqUrl, function(err, conn) {
      conn.createChannel(function(err, ch) {
        ch.assertQueue(channel, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(channel, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
      });
    });
}


module.exports = {
  sendTask: sendTask,
  consumeTask: consumeTask
}
