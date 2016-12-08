var rabbitmqHelper = require('./mq_service/rabbitHelper');
var clients = require('./clients.json');

function sendClientsToMQ() {
    for (var i = 0; i < clients.length; i++) {
        var cli = clients[i];
        rabbitmqHelper.sendTask(cli.type, JSON.stringify(cli));
        console.log(JSON.stringify(cli));
    }
};

sendClientsToMQ();