//send job to mq
node send.js
----------- description ------
rabbitmqHelper.sendTask('google', JSON.stringify(gugle1));
first paramtere is channel
second paramere is messagebody





//consume job from mq
node work.js
----------- description ------
in work.js

saveToDB : true, retrieve data save to db
           false, retrieve data print on console.(debug)

rabbitmqHelper.consumeTask('google', apiCall);

first paramtere is channel, define matches in send.js
